import React from 'react';

const CreatePostCreateCommunityCard = () => {
  return (
    <div className="flex flex-col border border-solid border-gray-400 bg-white rounded shadow p-4">
    <div className="h-auto" style={{ maxHeight: 'none' }}>
      <div
        className="bg-cover bg-center hpxKmfWP2ZiwdKaWpefMn"
        style={{
          backgroundImage:
            'url("https://www.redditstatic.com/desktop2x/img/id-cards/home-banner@2x.png")',
        }}
      ></div>
      <div className="flex items-center">
        <div
          className="w-10 h-16 bg-no-repeat bg-center bg-contain"
          style={{
            backgroundImage:
              'url("https://www.redditstatic.com/desktop2x/img/id-cards/snoo-home@2x.png")',
          }}
        ></div>
        <div className="flex items-center">
          <span className="font-bold px-4">Home</span>
        </div>
      </div>
    </div>
    <div className="py-4">
      <div className="_1zPvgKHteTOub9dKkvrOl4">
        Your personal Reddit frontpage. Come here to check in with your favorite communities.
      </div>
    </div>
    <hr className="my-4" />
    <div className="flex flex-col justify-start space-y-4 w-full">
  <a
    className="flex items-center justify-center px-4 py-2 font-bold text-white bg-blue-500 rounded-xl focus:outline-none hover:bg-blue-600"
    href="/submit"
  >
    Create Post
  </a>
  <a
  className="flex items-center justify-center px-4 py-2 font-bold text-blue-500 border border-blue-500 rounded-xl focus:outline-none hover:bg-blue-100 "
  href="/submit"
  >
    Create Community
  </a>

</div>

  </div>
  );
};

export default CreatePostCreateCommunityCard;
