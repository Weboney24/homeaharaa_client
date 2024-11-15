import React from "react";

import CustomTopbar from "../../component/CustomTopbar";
const PrivacyPolicy = () => {
  let PrivacyData = [
    {
      id: 1,
      name: "Who we are",
      content: ` Our website address is: https://homeaharaa.com`,
    },
    {
      id: 2,
      name: "Comments",
      content: `When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor’s IP address and browser user agent string to help spam detection.

An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. The Gravatar service privacy policy is available here: https://homeaharaa.com/privacy-policy/ After approval of your comment, your profile picture is visible to the public in the context of your comment.`,
    },
    {
      id: 3,
      name: "Media",
      content: ` If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.`,
    },
    {
      id: 4,
      name: "Cookies",
      content: `If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.

If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.

When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select “Remember Me”, your login will persist for two weeks. If you log out of your account, the login cookies will be removed.

If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.`,
    },
    {
      id: 5,
      name: "Embedded content from other websites",
      content: ` Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.

These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.`,
    },
    {
      id: 6,
      name: "Who we share your data with",
      content: `If you request a password reset, your IP address will be included in the reset email.`,
    },
    {
      id: 7,
      name: "How long we retain your data",
      content: `If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve any follow-up comments automatically instead of holding them in a moderation queue.

For users that register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.`,
    },
    {
      id: 8,
      name: "What rights you have over your data",
      content: ` If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.`,
    },
    {
      id: 9,
      name: "Where we send your data",
      content: `Visitor comments may be checked through an automated spam detection service.`,
    },
  ];

  return (
    <div className="w-full px-[8vw] !font-Poppins">
      <CustomTopbar text="Privacy Policy" />
      <div className="w-full py-6">
        {PrivacyData.map((res, index) => {
          return (
            <div key={index} className="mb-6">
              <h2 className={"text-2xl font-medium"}>{res.name}</h2>
              <p className="pt-2 text-secondary_color leading-loose">{res.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
