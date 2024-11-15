import CustomTopbar from "../../component/CustomTopbar";

const ShippingPolicy = () => {
  let BoldOutput = ({ text }) => {
    return <span className="font-bold text-black">{text}</span>;
  };

  return (
    <div className="w-full px-[8vw] !font-Poppins">
      <CustomTopbar text="Shipping Policy" />
      <div className="w-full py-6">
        <h1 className="text-2xl text-secondary_color">What are OUR shipping rules + policies?</h1>
        <div className="flex flex-col gap-y-4 pt-2">
          <p className="description_color">
            <BoldOutput text={"homeAharaa"} /> and our partners take enormous pride in every product we offer and strive to deliver them in the best possible condition via the requested delivery option.
          </p>
          <p className="description_color">While there are many things we do to mitigate the risk of shipping damage around the country, there are unfortunately some things outside of our control like the weather and transit delays once the package is in the hands of FedEx, UPS or USPS. As such, the shipping guidelines published on this website are not guarantees of a shipping or arrival date.</p>
          <p className="description_color">
            <BoldOutput text={"homeAharaa"} /> is unable to guarantee time of delivery, as this is all subject to the local carrier. Most carriers will deliver packages anytime between 8am-8pm. If you are placing an order for a time-sensitive event, we recommend placing your order early and scheduling it to arrive 2+ days before your event. A majority of our products can be refrigerated upon arrival to preserve freshness.
          </p>
          <p className="description_color">
            In anticipation of high package volumes (especially during holidays) or other uncontrollable events, we may have your order ship early to ensure that it arrives in good condition.
            <BoldOutput text={"homeAharaa reserves the right to schedule the arrival of your order earlier or later than estimated to prevent delays, based on operational conditions. "} />{" "}
          </p>
          <p className="description_color">
            <BoldOutput text={"homeAharaa"} /> is not responsible for delays in transit caused by high package volume, weather, mechanical error, strikes, natural disasters, terrorism safety control, local carrier mis-scans or inaccurate/incomplete shipping information, and we do not require a signature for the release of any shipment. Leaving a package at an address is ultimately up to the complete discretion of the individual delivery person and is therefore entirely outside our control.
          </p>
          <p className="description_color">
            <BoldOutput text={"Customers are responsible for checking that all shipping information is correct "} /> before submitting an order as well as in their order confirmation email. If you need to modify/cancel the order once your order has been made you should do that within 120 minutes of your order is made.
          </p>
          <p className="description_color">
            <BoldOutput text={"There are no returns, refunds or cancellations allowed on any orders that have shipped."} />
            All packages are shipped via UPS or FedEx and therefore we cannot ship to P.O. Box addresses.
          </p>
          <p className="description_color">Spot Rates will be provided for above 70 Kgs. Shipments based on enquiry. Global Critical Surcharges Rs.37/- Per Kg. + FSC + GST applicable for all shipments. This Surcharge is applicable apart from your Agreed Tariff Rates, Calculate as per below.</p>
          <p className="description_color">
            <BoldOutput text={"Calculation"} /> Base Tariff + Critical Surcharge + FSC + GST.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
