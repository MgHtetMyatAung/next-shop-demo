import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const teamMembers = [
  {
    name: "Jane Doe",
    role: "CEO & Founder",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "John Smith",
    role: "CTO",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Alice Johnson",
    role: "Head of Design",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Bob Williams",
    role: "Customer Service Lead",
    image: "/placeholder.svg?height=200&width=200",
  },
];

const values = [
  {
    title: "Quality",
    description: "We never compromise on the quality of our products.",
  },
  {
    title: "Innovation",
    description: "Constantly evolving to meet customer needs.",
  },
  {
    title: "Sustainability",
    description: "Committed to eco-friendly practices.",
  },
  {
    title: "Customer-Centric",
    description: "Your satisfaction is our top priority.",
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto mt-10">
      <h1 className=" text-2xl md:text-3xl font-bold text-center mb-8">
        About Our Store
      </h1>

      {/* Company Introduction */}
      <section className="mb-12">
        <h2 className=" text-lg md:text-2xl font-semibold mb-4">Our Story</h2>
        <p className=" mb-4">
          Founded in 2010, YourStore began with a simple mission: to provide
          high-quality products with exceptional customer service. What started
          as a small online shop has grown into a trusted ecommerce destination,
          serving customers worldwide.
        </p>
        <p className="text-lg mb-4">
          Our passion for [your niche] drives us to continuously innovate and
          improve, ensuring that we offer only the best to our valued customers.
        </p>
      </section>

      {/* Mission Statement */}
      <section className="mb-12 bg-primary text-primary-foreground p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg italic">
          "To empower our customers with top-notch [products/services] that
          enhance their lives, while fostering a culture of innovation,
          sustainability, and exceptional service."
        </p>
      </section>

      {/* Team Section */}
      {/* <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <Card key={member.name}>
              <CardContent className="p-4 text-center">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={200}
                  height={200}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section> */}

      {/* Values Section */}
    </div>
  );
}
