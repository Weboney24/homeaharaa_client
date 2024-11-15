import CustomTopbar from "../../component/CustomTopbar";

const CancellationPolicy = () => {
  let BoldOutput = ({ text }) => {
    return <span className="font-bold text-black">{text}</span>;
  };

  return (
    <div className="w-full px-[8vw] !font-Poppins min-h-screen">
      <CustomTopbar text="Cancellation Policy" />
      <div className="w-full py-6">
        <BoldOutput text={"CANCEL ORDER"} />
        <div className="flex flex-col gap-y-4 pt-2">
          <p className="description_color">We You can cancel your order within the 12 hours from the time you placed an order with us.</p>
          <p className="description_color">You will be getting an intimation mail once your order is shipped.</p>
          <p className="description_color">All you need to do is send us an email to customer care@homeaharaa.com with the subject titled in cancellation “ your order no ” and the reason for cancellation OR you can also send us an WhatsApp message regarding cancellation of order.12</p>
        </div>
      </div>
    </div>
  );
};

export default CancellationPolicy;
