import CustomTopbar from "../../component/CustomTopbar";

const ReturnAndRefungPolicy = () => {
  let BoldOutput = ({ text }) => {
    return <span className="font-bold text-black">{text}</span>;
  };

  return (
    <div className="w-full px-[8vw] !font-Poppins">
      <CustomTopbar text="Return & Refund policy" />
      <div className="py-6 leading-loose">
        <h1 className="font-bold text-black text-2xl py-2">What is your Refund Policy?</h1>
        <p className="description_color">Subject to the conditions mentioned in our cancellation policy any amount credited to our account will be refunded. We will refund your money back but kindly allow us 10days to process the refund.</p>
        <ul className="pt-4 flex flex-col gap-y-2 description_color">
          <li>TRACK ORDER</li>
          <li>Order id or number</li>
          <li>Email id</li>
          <li>Phone number</li>
          <li>Click on track my order.</li>
        </ul>
        <h1 className="font-bold text-black text-2xl py-2 pt-6">What is your Return Policy?</h1>
        <div className="flex flex-col gap-y-2">
          <p className="description_color">All items are final sale. If an item arrives damaged or spoiled, our Customer Support team will work with you to determine an appropriate solution. Please reach out to our team at customercare@manikmalyan.com to resolve the issue within 36 hours of delivery.</p>
          <h1 className="font-bold text-black text-2xl py-2 pt-6">Holidays – Can I reschedule, edit, or cancel an order?</h1>
          <p className="description_color">If the order’s “Ships On” date (as outlined in your confirmation email) is 3 or more days away, you can cancel your own order, (pending your order hasn’t already entered the shipping location).</p>
          <p className="description_color">
            Our team is busy expediting the shipping for the new orders, which makes it difficult for them to pull an order that has already entered the shipping process. <span className="font-bold text-black"> Therefore, we are unable to guarantee a cancellation or modification of an order that is shipping in less than 24 hours.</span>{" "}
          </p>
          <p className="description_color">If your inquiry is received in less than 24 hours after your order, we will do everything in our power to accommodate your request. You can edit your order to add/remove items</p>
          <p className="description_color">
            Please be aware that you cannot edit the delivery address once your order has shipped. <span className="font-bold text-black">There are no returns, modifications, or cancellations allowed on any items once shipped.</span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReturnAndRefungPolicy;
