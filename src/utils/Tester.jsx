export default function ResponsiveTester() {
    return (
        <div
            className="
          h-4xl w-full
          bg-red-500
          sm:bg-yellow-500
          md:bg-green-500
          lg:bg-blue-500
          xl:bg-indigo-500
          2xl:bg-purple-500
  
          flex items-center justify-center
        "
        >
            {/* Default: 0px – red */}
            <p className="block sm:hidden text-white text-sm">
                Default (0px+): bg-red-500
            </p>

            {/* sm: 640px – yellow */}
            <p className="hidden sm:block md:hidden text-black text-sm">
                SM (≥640px): bg-yellow-500
            </p>

            {/* md: 768px – green */}
            <p className="hidden md:block lg:hidden text-white text-sm">
                MD (≥768px): bg-green-500
            </p>

            {/* lg: 1024px – blue */}
            <p className="hidden lg:block xl:hidden text-white text-sm">
                LG (≥1024px): bg-blue-500
            </p>

            {/* xl: 1280px – indigo */}
            <p className="hidden xl:block 2xl:hidden text-white text-sm">
                XL (≥1280px): bg-indigo-500
            </p>

            {/* 2xl: 1536px – purple */}
            <p className="hidden 2xl:block text-white text-sm">
                2XL (≥1536px): bg-purple-500
            </p>
        </div>
    );
}
