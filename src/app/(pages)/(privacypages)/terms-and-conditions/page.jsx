import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ImageHelper } from "@/helper/imagehelper";
import CustomTopbar from "../../component/CustomTopbar";

export default function Terms() {
  const termsContent = [
    {
      title: "TERMS AND CONDITIONS",
      paragraphs: ["By subscribing to or using the services of homeAharaa.com you agree that you have read, understood and are bound by the terms, regardless of how you subscribe to or use the services.", "Therefore the users are advised to read the terms and conditions very carefully as your use of service is subject to your acceptance and compliance with these terms and conditions."],
    },
  ];

  const definitions = [
    {
      term: "Agreement",
      definition: "means this agreement incorporating any terms set out in our acknowledgement;",
    },
    {
      term: "Acknowledgement",
      definition: "means the initial automatic email acknowledgment which we will send to you after receiving your order;",
    },
    {
      term: "Order",
      definition: "means your order for products made via the site;",
    },
    {
      term: "Products",
      definition: "means goods which may be purchased by you from the site;",
    },
    {
      term: "Site",
      definition: "means the website at homeAharaa.com or any successor site operated by us from time to time.",
    },
  ];

  const communicationsContent = [
    {
      heading: "Electronic Communications",
      paragraphs: ["When you visit homeAharaa.com or send emails to us, you are communicating with us electronically. You consent to receive communications from us electronically. We will communicate with you by e-mail or by posting notices on this site. You agree that all agreements, notices, disclosures, and other communications that we provide to you electronically satisfy any legal requirement that such communications be in writing."],
    },
  ];

  const obligationContent = [
    {
      heading: "User Obligations",
      paragraphs: [
        "You are responsible for maintenance of the confidentiality of your user id and password and are also fully responsible for all activities that occur under your password or account.",
        "You agree that if You provide any information that is untrue, inaccurate, not current or incomplete or if we have reasonable grounds to suspect that such information is untrue, inaccurate, not current or incomplete, or not in accordance with the this Terms of Use, We shall have the right to indefinitely suspend or terminate or block access of your membership on the Website and refuse to provide You with access to the Website.",
        "You agree to immediately notify homeAharaa.com of any unauthorized use of your password or account or any other breach of security.",
        "You agree to ensure that You exit from your account at the end of each session. homeAharaa.com cannot and will not be liable for any loss or damage arising from your failure to comply with these terms.",
        "You agree and understand that when You are communicating with Us by sending emails, You are communicating with Us through electronic records and consent to receive communications via electronic records from Us periodically as and when required.",
        <p>
          You do not need to pay a fee for registration in com. But <span className="font-bold">homeAharaa.com</span> reserves the right to introduce new services and policies and modify some or all of the existing services offered or policies followed on the Website.Changes shall automatically become effective immediately after they are posted on the Website
        </p>,
        "The user guarantees, warrants, and certifies that you are the owner of the content which you submit or otherwise authorized to use the content and that the content does not infringe upon the property rights, intellectual property rights or other rights of others. You further warrant that to your knowledge, no action, suit, proceeding, or investigation has been instituted or threatened relating to any content, including trademark, trade name service mark, and copyright formerly or currently used by you in connection with the Services rendered by homeAharaa.com.",
      ],
    },
  ];

  const photosImagesContent = [
    {
      heading: "Photos & Images",
      paragraphs: [
        <p>
          Photos and Images found in <span className="font-bold">com</span> and in advertisements made <span className="font-bold">homeAharaa.com</span> in online or offline or in any media are the exclusive property of <span className="font-bold">homeAharaa.com</span> and no one is authorised to use, download, change, alter the image of the product without prior express written approval from home aharaa.com. The photos that appear on the website and other medium of advertisement, information or anywhere are garnished and some props may be used to lift the overall appearance and appeal of the product which may or may not necessarily form part of the product when you order. className
        </p>,
      ],
    },
  ];

  const consumerRightsContent = [
    {
      heading: "Consumer Rights",
      paragraphs: ["You may cancel this agreement at any time within 2 working days, after the day you received the products (subject to the limitations set out below).", "You will not have any such right insofar as this Agreement relates to: (i) the products which have been unsealed by you; (ii) the products which are specifically manufactured as per your order and consent; like the custom spice powders made based on your preference OR (iii) the herbs collected and processed for you.", "If you cancel this agreement on this basis, you must inform us in writing and return the products to us immediately, in the same condition in which you received them. Products returned by you within the 2 working day period referred to above will be refunded in full (including the cost of sending the products to you).", "A photocopy of the product with damages shown or capturing your complaints should be shared with us to start the refund process. Refunds will be processed solely depending upon our acceptance of your complaint."],
    },
  ];

  const defectiveProductsContent = [
    {
      heading: "Defective Products",
      paragraphs: ["You may also cancel this agreement if the products supplied are defective.", "Products returned by you because of a defect will be refunded in full (including the cost of returning the products to us). Alternatively, if we and you agree, we may supply you with a replacement or substitute product."],
    },
  ];

  const reviewsContent = [
    {
      heading: "Reviews, Comments, e-mails, & Other Content",
      paragraphs: [
        "You may post reviews, comments, and other content: and submit suggestions, ideas, comments, questions, or other information, so long as the content is not illegal, obscene, threatening, defamatory, invasive of privacy, infringing of intellectual property rights, or otherwise injurious to third parties or objectionable and does not consist of or contain software viruses, political campaigning, commercial solicitation, chain letters, mass mailings, or any form of “spam”. You may not use a false e-mail address, impersonate any person or entity, or otherwise mislead as to the origin of a card or other content. com reserves the right (but not the obligation) to remove or edit such content, but does not regularly review posted content.",
        <p>
          If you do post content or submit material, and unless we indicate otherwise, you grant com and its associates a nonexclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content throughout the world in any media. You grant <span className="font-bold">homeAharaa.com</span> and its associates and sublicensees the right to use the name that you submit in connection with such content, if they choose. You represent and warrant that you own or otherwise control all of the rights to the content that you post: that the content is accurate: that use of the content you supply does not violate this policy and will not cause injury to any person or entity: and that you will indemnify
          <span className="font-bold"> homeAharaa.com</span> or its associates for all claims resulting from content you supply. <span className="font-bold">homeAharaa.com</span> has the right but not the obligation to monitor and edit or remove any activity or content. <span className="font-bold">homeAharaa.com</span> takes no responsibility and assumes no liability for any content posted by you or any third party.
        </p>,
      ],
    },
  ];

  const riskContent = [
    {
      heading: "Risk of Loss",
      paragraphs: [" All items purchased from com are made pursuant to a shipment contract. This basically means that the risk of loss and title for such items pass to you upon our delivery to the carrier."],
    },
  ];

  const limitationContent = [
    {
      heading: "Limitaitons of liability",
      paragraphs: [" Nothing in this agreement shall limit or exclude your or our liability for:", "Death or personal injury caused by negligence;", "Under section 12 of the Sale of Goods Act 1979, section 2 of the Supply of Goods and Services Act 1982, or section 2(3) of the Consumer Protection Act 1987;", "For fraud or fraudulent misrepresentation; or", "For any matter for which it would be illegal to limit or exclude, or attempt to limit or exclude, liability. Subject to this: (i) our liability in connection with any Product purchased through our site is strictly limited to the higher of the purchase price of the relevant Product and the replacement cost of the relevant Product; (ii) we accept no liability for any loss of income or revenue, loss of business, loss of profits or contracts, loss of anticipated savings, loss of data, waste of management or office time or for any indirect or consequential loss or damage of any kind however arising and whether caused by tort (including negligence), breach of contract or otherwise, even if foreseeable; and (iii) we will not be liable or responsible for any failure to perform, or delay in performance of, any of our obligations under this Agreement caused by events outside our reasonable control."],
    },
  ];

  const productDescriptionContent = [
    {
      heading: "Product Description",
      paragraphs: [
        <p>
          com and its associates attempt to be as accurate as possible. However, <span className="font-bold">homeAharaa.com</span> does not warrant that product descriptions or other content of this site is accurate, complete, reliable, current, or error-free. If a product offered by
          <span className="font-bold"> homeAharaa.com</span> itself is not as described, your sole remedy is to return it in unused condition.
        </p>,
      ],
    },
  ];

  const copyrightContent = [
    {
      heading: "Copyright",
      paragraphs: [
        <p>
          All content included on this site, such as text, graphics, logos, button icons, images, digital downloads, and data compilations is the property of <span className="font-bold">com</span> or its content suppliers and protected by copyright laws. The compilation of all content on this site is the exclusive property of <span className="font-bold">homeAharaa.com,</span> with copyright authorship for this collection by <span className="font-bold">homeAharaa.com,</span> and protected by copyright laws.
        </p>,
      ],
    },
  ];

  const questionsContent = [
    {
      heading: "Questions?",
      paragraphs: [
        <p>
          Questions regarding our <span className="font-bold">com</span> Terms of Usage, Privacy Policy, or other policy related material can be directed to our support staff by clicking on the “Contact” link in the footer of this page. Or you can email us directly at:
          <i>customercare@manikmalyan.com</i>
        </p>,
      ],
    },
  ];

  return (
    <div className="px-[8vw] w-full !font-Poppins">
      <CustomTopbar text="Terms and condition" />
      <section className="relative md:py-10 w-full">
        <div className=" relative text-justify">
          <div className="md:flex justify-center">
            <div className="w-full h-full">
              <div className="rounded-md">
                <div className="space-y-6">
                  {termsContent.map((content, index) => (
                    <div key={index} className="mb-6">
                      <h5 className="text-md font-semibold mb-4">{content.title}</h5>
                      {content.paragraphs.map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-black mb-2">
                          {paragraph.includes("homeAharaa.com") ? (
                            <>
                              {paragraph.split("homeAharaa.com")[0]}
                              <span className="font-bold">homeAharaa.com</span>
                              {paragraph.split("homeAharaa.com")[1]}
                            </>
                          ) : (
                            paragraph
                          )}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>

                <div>
                  <h5 className="text-xl font-semibold mb-4">Definitions & Interpretation</h5>
                  <p className="text-black mb-4">
                    In this agreement “We” refers to <span className="font-bold">homeAharaa.com</span> ( “us” & “our” shall be construed accordingly); and “You” refers to the relevant customer or potential customer as the case may be ( “your” shall be construed accordingly).
                  </p>
                  <p className="text-black mb-4">In this agreement, the following definitions shall apply:</p>
                  <ul className="list-inside">
                    {definitions.map((item, index) => (
                      <li key={index} className="mb-2">
                        <span className="font-bold">{item.term}</span> {item.definition}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  {communicationsContent.map((content, index) => (
                    <div key={index} className="mb-6">
                      <h5 className="text-xl font-semibold mb-4">{content.heading}</h5>
                      {content.paragraphs.map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-black  mb-2">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>

                <div>
                  {obligationContent.map((content, index) => (
                    <div key={index} className="mb-6">
                      <h5 className="text-xl font-semibold mb-4">{content.heading}</h5>
                      {content.paragraphs.map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-black  mb-2">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
                <div>
                  {photosImagesContent.map((content, index) => (
                    <div key={index} className="mb-6">
                      <h5 className="text-xl font-semibold mb-4">{content.heading}</h5>
                      {content.paragraphs.map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-black  mb-2">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
                <div>
                  {consumerRightsContent.map((content, index) => (
                    <div key={index} className="mb-6">
                      <h5 className="text-xl font-semibold mb-4">{content.heading}</h5>
                      {content.paragraphs.map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-black  mb-2">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
                <div>
                  {defectiveProductsContent.map((content, index) => (
                    <div key={index} className="mb-6">
                      <h5 className="text-xl font-semibold mb-4">{content.heading}</h5>
                      {content.paragraphs.map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-black  mb-2">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
                <div>
                  {reviewsContent.map((content, index) => (
                    <div key={index} className="mb-6">
                      <h5 className="text-xl font-semibold mb-4">{content.heading}</h5>
                      {content.paragraphs.map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-black  mb-2">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
                <div>
                  {riskContent.map((content, index) => (
                    <div key={index} className="mb-6">
                      <h5 className="text-xl font-semibold mb-4">{content.heading}</h5>
                      {content.paragraphs.map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-black  mb-2">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
                <div>
                  {limitationContent.map((content, index) => (
                    <div key={index} className="mb-6">
                      <h5 className="text-xl font-semibold mb-4">{content.heading}</h5>
                      {content.paragraphs.map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-black  mb-2">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
                <div>
                  {productDescriptionContent.map((content, index) => (
                    <div key={index} className="mb-6">
                      <h5 className="text-xl font-semibold mb-4">{content.heading}</h5>
                      {content.paragraphs.map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-black  mb-2">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
                <div>
                  {copyrightContent.map((content, index) => (
                    <div key={index} className="mb-6">
                      <h5 className="text-xl font-semibold mb-4">{content.heading}</h5>
                      {content.paragraphs.map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-black  mb-2">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
                <div>
                  {questionsContent.map((content, index) => (
                    <div key={index} className="mb-6">
                      <h5 className="text-xl font-semibold mb-4">{content.heading}</h5>
                      {content.paragraphs.map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-black  mb-2">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
