import { MapPin } from "lucide-react";

export default function Map() {
  return (
    <div className="relative h-64 bg-muted rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <MapPin className="h-12 w-12 text-primary" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-4">
        <h3 className="font-semibold">Our Location</h3>
        <p className="text-sm text-muted-foreground">
          123 E-commerce St, Shopping City, 12345
        </p>
      </div>
    </div>
  );
}
