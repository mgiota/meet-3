/**
 *
 * @param {*} events:
 * The following function should be in the “api.js” file.
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */
 import axios from 'axios';
 import { mockData } from './mock-data';
 import NProgress from 'nprogress';


 export const extractLocations = (events) => {
	 var extractLocations = events.map((event) => event.location);
	 var locations = [...new Set(extractLocations)];
	 return locations;
 };


 export const checkToken = async (accessToken) => {
	 const result = await fetch(
		 `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
	 )
		 .then((res) => res.json())
		 .catch((error) => error.json());

	 return result;
 };


 const removeQuery = () => {
	 if (window.history.pushState && window.location.pathname) {
		 var newurl = window.location.protocol +
			 "//" +
			 window.location.host +
			 window.location.pathname;
		 window.history.pushState("", "", newurl);
	 } else {
		 newurl = window.location.protocol + '//' + window.location.host;
		 window.history.pushState('', '', newurl);
	 }
 };

 // This function takes code and encodes it using encodeURIComponent, then uses the encoded code to get token
 const getToken = async (code) => {
	 const encodeCode = encodeURIComponent(code);
	 const { access_token } = await fetch(
		 // 'https://29v6oisnpd.execute-api.eu-central-1.amazonaws.com/dev/api/token' + '/' + encodeCode //Line 49:83:  Unexpected string concatenation of literals  no-useless-concat
		 `https://29v6oisnpd.execute-api.eu-central-1.amazonaws.com/dev/api/token/${encodeCode}`
	 )
		 .then((res) => {
			 return res.json();
		 })
		 .catch((error) => error);

	 access_token && localStorage.setItem('access_token', access_token);

	 return access_token;
 };


 export const getEvents = async () => {
	 NProgress.start();

	 if (window.location.href.startsWith('http://localhost')) {
		 NProgress.done(); //NProgress and its functions are obtained from nprogress Node package
		 return mockData;
	 }
	 if (!navigator.onLine) {
		 const events = localStorage.getItem("lastEvents");
		 NProgress.done();
		 return events ? JSON.parse(events).events : [];
	 }
	 const token = await getAccessToken();
	 if (token) {
		 removeQuery();
		 //const url = 'https://29v6oisnpd.execute-api.eu-central-1.amazonaws.com/dev/api/get-events' + '/' + token; //Line 74:100:  Unexpected string concatenation of literals  no-useless-concat web
		 const url = `https://29v6oisnpd.execute-api.eu-central-1.amazonaws.com/dev/api/get-events/${token}`;
		 const result = await axios.get(url);
		 if (result.data) {
			 var locations = extractLocations(result.data.events);
			 localStorage.setItem('lastEvents', JSON.stringify(result.data));
			 localStorage.setItem('locations', JSON.stringify(locations));
		 }
		 NProgress.done();
		 return result.data.events;
	 }
 };


 export const getAccessToken = async () => {
	 const accessToken = localStorage.getItem('access_token');

	 const tokenCheck = accessToken && (await checkToken(accessToken));

	 if (!accessToken || tokenCheck.error) {
		 await localStorage.removeItem('access_token');
		 const searchParams = new URLSearchParams(window.location.search);
		 const code = await searchParams.get('code');
		 if (!code) {
			 const results = await axios.get(
				 'https://29v6oisnpd.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url'
			 );
			 const { authUrl } = results.data;
			 return (window.location.href = authUrl);
		 }
		 return code && getToken(code);
	 }
	 return accessToken;
 };
