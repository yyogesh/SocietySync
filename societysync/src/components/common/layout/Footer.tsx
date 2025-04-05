const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} SocietyHub. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="text-sm text-gray-500 hover:text-primary">
            Privacy Policy
          </a>
          <a href="#" className="text-sm text-gray-500 hover:text-primary">
            Terms of Service
          </a>
          <a href="#" className="text-sm text-gray-500 hover:text-primary">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

