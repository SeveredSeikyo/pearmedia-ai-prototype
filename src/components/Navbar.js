import { FlaskConical, Sparkles } from "lucide-react";


const Navbar = ({ activeTab, setActiveTab }) => {

    const navItems = [
        {
            id: 'text',
            label: 'Creative Studio',
            icon: <Sparkles size={20} />
        },
        {
            id: 'image',
            label: 'Style Lab',
            icon: <FlaskConical size={20} />
        },
    ];

    return (
        <nav
            className="fixed bottom-0 left-0 z-40 w-full bg-white border-t border-gray-200 md:relative md:bottom-auto md:bg-transparent md:border-none md:mb-5"
        >
        <div 
            className="flex justify-around items-center h-16 md:h-auto md:rounded-xl md:overflow-hidden md:shadow-sm"
        >
            {
                navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`
                            flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2
                            w-full py-2 px-5 transition-all duration-200 outline-none
                            ${activeTab === item.id
                                ? 'text-blue-600 md:bg-blue-500 md:text-white'
                                : 'text-gray-500 bg-white md:bg-gray-100 md:text-gray-600 hover:bg-gray-50'
                            }
                        `}
                    >
                        {item.icon}
                        <span className="text-[10px] font-medium md:text-sm">{item.label}</span>

                        {activeTab === item.id && (
                            <div
                                className="w-1 h-1 bg-blue-600 rounded-full md:hidden"
                            />
                        )}
                    </button>
                ))
            }
        </div>
        </nav>
    );
}

export default Navbar;