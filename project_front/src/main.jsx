import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './userContext.jsx';
// import './index.css'

//bootstrap template...........................
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/bootstrap.min.css';
import './assets/css/animate.css';
import './assets/css/owl.carousel.min.css';
import './assets/css/all.css';
import './assets/css/flaticon.css';
import './assets/css/themify-icons.css';
import './assets/css/magnific-popup.css';
import './assets/css/slick.css';
import './assets/css/style.css';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	// <React.StrictMode>
	<BrowserRouter>
		<UserProvider>
			<App />
		</UserProvider>
	</BrowserRouter>
	// </React.StrictMode>,
);
