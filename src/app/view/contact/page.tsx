import { getSetting } from "@/actions/setting/setting.action";
import ContactForm from "@/components/view/contact/ContactForm";
import ContactInfo from "@/components/view/contact/ContactInfo";
import Map from "@/components/view/contact/Map";

export async function generateMetadata({}: {}) {
  const setting = await getSetting();
  return {
    title: "Contact Us" + " | " + setting?.storeName,
  };
}

export default function ContactPage() {
  return (
    <div className="container py-7">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Contact Us
      </h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <ContactForm />
        </div>
        <div className="space-y-8">
          <ContactInfo />
          <Map />
        </div>
      </div>
    </div>
  );
}
