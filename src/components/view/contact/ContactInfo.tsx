import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg md:text-2xl font-semibold">Get in Touch</h2>
      <p className="text-muted-foreground">
        We'd love to hear from you. Please fill out the form or contact us using
        the information below.
      </p>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <span>123 E-commerce St, Shopping City, 12345</span>
        </div>
        <div className="flex items-center space-x-2">
          <Phone className="h-5 w-5 text-muted-foreground" />
          <span>+1 (555) 123-4567</span>
        </div>
        <div className="flex items-center space-x-2">
          <Mail className="h-5 w-5 text-muted-foreground" />
          <span>support@ecommerce-example.com</span>
        </div>
      </div>
    </div>
  );
}
