const ServicesScroll: React.FC = () => {
  const services = [
    "Sustainable Packaging",
    "Eco-Friendly Materials",
    "Waste Reduction Solutions",
    "Biodegradable Options",
    "Circular Economy",
    "Carbon Footprint Reduction",
    "Green Supply Chain",
    "Environmental Consulting",
  ];

  return (
    <div className="bg-ecoware-primary text-white py-4 overflow-hidden">
      <div className="whitespace-nowrap animate-scroll">
        {/* Duplicate the services array to create seamless loop */}
        {[...services, ...services].map((service, index) => (
          <span
            key={index}
            className="inline-flex items-center mx-8 text-lg font-medium"
          >
            {service}
            <span className="mx-8 text-ecoware-primary-accent text-2xl">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default ServicesScroll;
