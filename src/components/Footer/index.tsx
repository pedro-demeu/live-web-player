const Footer = () => {
  return (
    <div className="w-full bg-gray-900 text-white py-4 flex justify-center items-center">
      <p className="text-sm">
        &copy;
        {new Date().getFullYear() !== 2024
          ? `2024 - ${new Date().getFullYear()}`
          : `2024`}{" "}
        Pedro Demeu
      </p>
    </div>
  );
};

export default Footer;
