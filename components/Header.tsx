import NavItems from "@/components/NavItems";

const Header = () => {
    return (
        <header className="sticky top-0 header">
            <div className="container header-wrapper">
                <div className="flex items-center justify-center gap-2 select-none">
                    <span className="text-xl font-semibold tracking-tight text-gray-100">
                        LensInsight
                    </span>
                </div>
                <nav className="hidden sm:block">
                    <NavItems />
                </nav>
                <div />
            </div>
        </header>
    )
}
export default Header