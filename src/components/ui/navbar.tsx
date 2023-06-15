import React from 'react';

const Navbar = () => {
  return (
    <>
    <div className="px-5 w-full fixed h-12 bg-white border-grey-lightest border-b flex items-center">
      <div className="container mx-auto flex">
        <div className="w-3/5 flex">
          <div className="">
            <a href="#" className="w-auto inline-flex items-center h-full">
              <svg className="h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><g><circle fill="#FF4500" cx="10" cy="10" r="10"></circle><path fill="#FFF" d="M16.67,10A1.46,1.46,0,0,0,14.2,9a7.12,7.12,0,0,0-3.85-1.23L11,4.65,13.14,5.1a1,1,0,1,0,.13-0.61L10.82,4a0.31,0.31,0,0,0-.37.24L9.71,7.71a7.14,7.14,0,0,0-3.9,1.23A1.46,1.46,0,1,0,4.2,11.33a2.87,2.87,0,0,0,0,.44c0,2.24,2.61,4.06,5.83,4.06s5.83-1.82,5.83-4.06a2.87,2.87,0,0,0,0-.44A1.46,1.46,0,0,0,16.67,10Zm-10,1a1,1,0,1,1,1,1A1,1,0,0,1,6.67,11Zm5.81,2.75a3.84,3.84,0,0,1-2.47.77,3.84,3.84,0,0,1-2.47-.77,0.27,0.27,0,0,1,.38-0.38A3.27,3.27,0,0,0,10,14a3.28,3.28,0,0,0,2.09-.61A0.27,0.27,0,1,1,12.48,13.79Zm-0.18-1.71a1,1,0,1,1,1-1A1,1,0,0,1,12.29,12.08Z"></path></g></svg>
              <svg className="h-5 ml-2 hidden xl:flex" viewBox="0 0 55 17.44"><g fill="#1c1c1c"><circle fill="#FF4500" cx="45.77" cy="3.33" r="2.05"></circle><path fill="inherit" d="M16.73,12.05a1.44,1.44,0,0,0,1.54-1.48,4.91,4.91,0,0,0-.1-0.83,5.66,5.66,0,0,0-5.34-4.61c-3,0-5.51,2.76-5.51,6.15s2.47,6.15,5.51,6.15a5.47,5.47,0,0,0,4.26-1.78,1.19,1.19,0,0,0-.19-1.77,1.25,1.25,0,0,0-1.53.16,3.78,3.78,0,0,1-2.54,1.09,3.42,3.42,0,0,1-3.14-3.08h7ZM12.82,7.44a3.3,3.3,0,0,1,3,2.56h-6A3.3,3.3,0,0,1,12.82,7.44Z"></path><path fill="inherit" d="M7.44,6.32a1.15,1.15,0,0,0-1-1.14A4.46,4.46,0,0,0,2.31,6.69V6.54A1.15,1.15,0,1,0,0,6.54V16a1.18,1.18,0,0,0,1.08,1.2A1.15,1.15,0,0,0,2.31,16V11.15A3.51,3.51,0,0,1,6.15,7.47H6.38A1.15,1.15,0,0,0,7.44,6.32Z"></path><path fill="inherit" d="M46.92,7.56a1.15,1.15,0,0,0-2.31,0V16a1.15,1.15,0,1,0,2.31,0V7.56Z"></path><path fill="inherit" d="M29.87,1.15A1.15,1.15,0,0,0,28.72,0h0a1.15,1.15,0,0,0-1.15,1.15V6.31a4,4,0,0,0-2.95-1.18c-3,0-5.51,2.76-5.51,6.15s2.47,6.15,5.51,6.15a4.08,4.08,0,0,0,3-1.19A1.15,1.15,0,0,0,29.87,16V1.15Zm-5.26,14c-1.77,0-3.21-1.72-3.21-3.85s1.43-3.85,3.21-3.85,3.21,1.72,3.21,3.85S26.39,15.13,24.62,15.13Z"></path><path fill="inherit" d="M41.92,1.15A1.15,1.15,0,0,0,40.77,0h0a1.15,1.15,0,0,0-1.15,1.15V6.31a4,4,0,0,0-2.95-1.18c-3,0-5.51,2.76-5.51,6.15s2.47,6.15,5.51,6.15a4.08,4.08,0,0,0,3-1.19A1.15,1.15,0,0,0,41.92,16V1.15Zm-5.26,14c-1.77,0-3.21-1.72-3.21-3.85s1.43-3.85,3.21-3.85,3.21,1.72,3.21,3.85S38.44,15.13,36.67,15.13Z"></path><path fill="inherit" d="M52.91,16V7.44h1a1,1,0,0,0,1.06-1,1,1,0,0,0-1-1.09H52.91V3.76a1.18,1.18,0,0,0-1.08-1.19,1.15,1.15,0,0,0-1.23,1.15V5.38h-1a1,1,0,0,0-1.06,1,1,1,0,0,0,1,1.09h1V16a1.15,1.15,0,0,0,1.15,1.15h0A1.15,1.15,0,0,0,52.91,16Z"></path></g></svg>
            </a>
          </div>
          <div className="ml-5">
            <div className="w-68 h-full border border-white hover:border-grey-lightest flex items-center rounded px-10 relative">
              <svg className="w-5 absolute pin-l ml-2 fill-current text-blue-dark" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g><polygon fill="none" points="0 20 20 20 20 0 0 0"></polygon><polygon fill="inherit" points="12.5 3.5 20 3.5 20 11 17.5 8.5 11.25 14.75 7.5 11 2.5 16 0 13.5 7.5 6 11.25 9.75 15 6"></polygon></g></svg>
              <span className="font-medium text-sm">Popular</span>
              <svg className="w-6 absolute pin-r mr-2" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g><path fill="inherit" d="M14.1711599,9.3535 L9.99925636,13.529 L5.82735283,9.3535 C5.51262415,9.0385 5.73543207,8.5 6.18054835,8.5 L13.8179644,8.5 C14.2630807,8.5 14.4858886,9.0385 14.1711599,9.3535"></path></g></svg>
            </div>
          </div>
          <div className="w-full mx-5">
            <div className="flex items-center w-auto h-full pl-8 pr-2 border border-grey-lightest hover:border-blue rounded relative">
              <svg className="w-4 absolute pin-l ml-2 fill-current text-grey-dark" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg"><g><path d="M12.4743167,11.1299698 L14.6957506,13.2817166 C15.0924476,13.665969 15.1025359,14.2990536 14.7182834,14.6957506 C14.334031,15.0924476 13.7009464,15.1025359 13.3042494,14.7182834 L11.0486163,12.5334103 C10.0079655,13.2768564 8.73367013,13.7142857 7.35714286,13.7142857 C3.84600096,13.7142857 1,10.8682847 1,7.35714286 C1,3.84600096 3.84600096,1 7.35714286,1 C10.8682847,1 13.7142857,3.84600096 13.7142857,7.35714286 C13.7142857,8.76975383 13.2536226,10.0747029 12.4743167,11.1299698 Z M11.7142857,7.35714286 C11.7142857,4.95057046 9.76371525,3 7.35714286,3 C4.95057046,3 3,4.95057046 3,7.35714286 C3,9.76371525 4.95057046,11.7142857 7.35714286,11.7142857 C9.76371525,11.7142857 11.7142857,9.76371525 11.7142857,7.35714286 Z"></path></g></svg>
              <input className="text-sm w-full" type="text" name="search" placeholder="Search Reddit"/>
            </div>
          </div>
        </div>
        <div className="w-2/5 flex justify-end items-center">
          <a href="#" className="p-2 flex items-center rounded-sm mr-2 hover:bg-grey-lighter">
            <svg className="w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g><polygon fill="none" points="0 20 20 20 20 0 0 0"></polygon><polygon fill="inherit" points="12.5 3.5 20 3.5 20 11 17.5 8.5 11.25 14.75 7.5 11 2.5 16 0 13.5 7.5 6 11.25 9.75 15 6"></polygon></g></svg>
          </a>
          <a href="#" className="p-2 flex items-center rounded-sm mr-2 hover:bg-grey-lighter">
            <svg className="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><g fill-rule="evenodd"><polygon fill="none" points="0 20 20 20 20 .001 0 .001"></polygon><path fill="inherit" d="M1.25,17.5 L1.25,7.5 L6.25,7.5 L6.25,17.5 L1.25,17.5 Z M12.49995,17.5001 L7.49995,17.5001 L7.49995,5.0001 L4.99995,5.0001 L9.99995,0.0006 L14.99995,5.0001 L12.49995,5.0001 L12.49995,17.5001 Z M13.75,17.5 L13.75,12.5 L18.75,12.5 L18.75,17.5 L13.75,17.5 Z"></path></g></svg>
          </a>
          <a href="#" className="p-2 flex items-center rounded-sm mr-2 hover:bg-grey-lighter">
            <svg className="w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="inherit" d="M16.9998,2.9995 C18.1028,2.9995 18.9998,3.8975 18.9998,4.9995 L18.9998,14.9995 C18.9998,16.1025 18.1028,16.9995 16.9998,16.9995 L2.9998,16.9995 C1.8978,16.9995 0.9998,16.1025 0.9998,14.9995 L0.9998,4.9995 C0.9998,3.8975 1.8978,2.9995 2.9998,2.9995 L16.9998,2.9995 Z M13.9648,13.3525 C15.2718,13.3525 16.3188,12.6745 16.8278,11.5665 L15.1818,10.9775 C14.9318,11.4765 14.4528,11.8165 13.8338,11.8165 C13.0158,11.8165 12.3478,11.0575 12.3478,9.9995 C12.3478,8.9525 13.0058,8.1735 13.8438,8.1735 C14.4528,8.1735 14.9218,8.5025 15.1308,8.9615 L16.6968,8.2435 C16.1988,7.2755 15.2108,6.6365 13.9648,6.6365 C12.0588,6.6365 10.5118,8.1335 10.5118,9.9995 C10.5118,11.8755 12.0588,13.3525 13.9648,13.3525 Z M6.6248,13.3635 C8.5408,13.3635 10.0878,11.8755 10.0878,9.9995 C10.0878,8.1335 8.5408,6.6365 6.6248,6.6365 C4.7188,6.6365 3.1718,8.1335 3.1718,9.9995 C3.1718,11.8755 4.7188,13.3635 6.6248,13.3635 Z M6.625,8.1641 C7.562,8.1641 8.262,8.9421 8.262,10.0001 C8.262,11.0481 7.562,11.8361 6.625,11.8361 C5.697,11.8361 4.998,11.0481 4.998,10.0001 C4.998,8.9421 5.697,8.1641 6.625,8.1641 Z"></path></svg>
          </a>
          <a href="#" className="border border-blue-dark text-blue-dark px-8 py-2.2 font-semibold text-xs rounded ml-4 no-underline hover:border-blue hover:text-blue">LOG IN</a>
          <a href="#" className="border border-blue-dark bg-blue-dark text-white px-8 py-2.2 font-semibold text-xs rounded ml-4 no-underline hover:bg-blue">SIGN UP</a>
          <button className="inline-flex items-center ml-3 mr-5">
            <div className="flex items-center pr-2">
              <svg className="w-6 fill-current text-grey-dark" viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg"><g fill="inherit"><path d="M146.8 142.6h-37.6c-31.1 0-56.5 25.3-56.5 56.5 0 5.2 4.2 9.4 9.4 9.4h131.8c5.2 0 9.4-4.2 9.4-9.4 0-31.2-25.3-56.5-56.5-56.5zM128 130.7c20.1 0 36.4-16.3 36.4-36.4v-9.4c0-20.1-16.3-36.4-36.4-36.4S91.6 64.8 91.6 84.9v9.4c0 20.1 16.3 36.4 36.4 36.4z"></path></g></svg>
            </div>
            <svg className="w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g><path fill="inherit" d="M14.1711599,9.3535 L9.99925636,13.529 L5.82735283,9.3535 C5.51262415,9.0385 5.73543207,8.5 6.18054835,8.5 L13.8179644,8.5 C14.2630807,8.5 14.4858886,9.0385 14.1711599,9.3535"></path></g></svg>
          </button>
        </div>
      </div>
    </div>
  </>
  );
};

export default Navbar;
