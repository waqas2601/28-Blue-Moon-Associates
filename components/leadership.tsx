export default function Leadership() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center justify-center gap-2 text-sm uppercase tracking-widest text-[#C9963A] mb-4">
            <span className="w-8 h-[2px] bg-[#C9963A]" />
            Our Leadership
            <span className="w-8 h-[2px] bg-[#C9963A]" />
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#4A4A4A] mb-4">
            The Minds Behind Blue Moon
          </h2>
          <p className="text-[#4A4A4A]/70 max-w-2xl mx-auto">
            Meet the visionaries who built Blue Moon Associates from the ground
            up
          </p>
        </div>

        {/* Row 1 - Shafaat Khan - Image Left, Text Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          {/* Image */}
          <div className="relative">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Shafaat Khan"
              className="rounded-lg shadow-xl w-full h-[500px] object-cover object-top"
            />
            <div className="absolute -bottom-6 -right-6 bg-[#29ABE2] text-white p-6 rounded-lg shadow-lg hidden md:block">
              <div className="text-2xl font-bold">Founder</div>
              <div className="text-sm">& CEO</div>
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-[#C9963A] mb-4">
              <span className="w-8 h-[2px] bg-[#C9963A]" />
              Meet Our CEO
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#4A4A4A] mb-3">
              Shafaat Khan
            </h2>
            <span className="inline-block bg-[#29ABE2] text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
              Founder & CEO
            </span>
            <p className="text-[#4A4A4A]/70 mb-4 leading-relaxed">
              With over 20 years of experience in Pakistan's real estate sector,
              Shafaat Khan has led Blue Moon Associates to become one of the
              most trusted names in property consulting and development.
            </p>
            <p className="text-[#4A4A4A]/70 mb-8 leading-relaxed">
              His visionary leadership and deep understanding of Pakistan's
              property market has been the driving force behind the company's
              growth and success across major cities.
            </p>
            {/* Achievement Badges */}
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 rounded-full text-sm font-medium bg-[#E0F4FB] text-[#29ABE2]">
                20+ Years Experience
              </span>
              <span className="px-4 py-2 rounded-full text-sm font-medium bg-[#E0F4FB] text-[#29ABE2]">
                500+ Projects
              </span>
              <span className="px-4 py-2 rounded-full text-sm font-medium bg-[#E0F4FB] text-[#29ABE2]">
                Visionary Leader
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-24" />

        {/* Row 2 - Abbas Ali - Text Left, Image Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="order-2 lg:order-1">
            <span className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-[#C9963A] mb-4">
              <span className="w-8 h-[2px] bg-[#C9963A]" />
              Meet Our Co-Founder
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#4A4A4A] mb-3">
              Abbas Ali
            </h2>
            <span className="inline-block bg-[#C9963A] text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
              Co-Founder & Director
            </span>
            <p className="text-[#4A4A4A]/70 mb-4 leading-relaxed">
              Abbas Ali brings deep expertise in real estate operations and
              project development, ensuring every Blue Moon project is delivered
              with precision, quality, and on schedule.
            </p>
            <p className="text-[#4A4A4A]/70 mb-8 leading-relaxed">
              His hands-on approach to project management and strong
              relationships with developers across Pakistan have been
              instrumental in delivering outstanding results for clients.
            </p>
            {/* Achievement Badges */}
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 rounded-full text-sm font-medium bg-[#F5EDD6] text-[#C9963A]">
                Operations Expert
              </span>
              <span className="px-4 py-2 rounded-full text-sm font-medium bg-[#F5EDD6] text-[#C9963A]">
                Project Management
              </span>
              <span className="px-4 py-2 rounded-full text-sm font-medium bg-[#F5EDD6] text-[#C9963A]">
                Development Lead
              </span>
            </div>
          </div>

          {/* Image */}
          <div className="relative order-1 lg:order-2">
            <img
              src="https://randomuser.me/api/portraits/men/44.jpg"
              alt="Abbas Ali"
              className="rounded-lg shadow-xl w-full h-[500px] object-cover object-top"
            />
            <div className="absolute -bottom-6 -left-6 bg-[#C9963A] text-white p-6 rounded-lg shadow-lg hidden md:block">
              <div className="text-2xl font-bold">Co-Founder</div>
              <div className="text-sm">& Director</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
