"use client";
import React, { useState, useEffect } from "react";
import {
    Navbar,
    MobileNav,
    MobileNavHeader,
    MobileNavMenu,
    MobileNavToggle,
    NavbarLogo,
    MobileAnimatedMenuItem
} from "@/components/ui/Resizable-navbar";


const navItems = [
    { name: "home", link: "/" },
    { name: "about us", link: "/about" },
    { name: "events", link: "/events" },
    { name: "contact us", link: "#contact", isContact: true },
    { name: "timeline", link: "/timeline" },
    { name: "terms and conditions", link: "/terms-and-conditions" },
];

export default function NavigationPanel() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const handleContactClick = (e: any) => {
        e.preventDefault();
        setMobileMenuOpen(false);

        const footer = document.getElementById("contact");
        if (!footer) return;

        footer.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };
    return (
        <>
            <MobileNav>
                <MobileNavHeader>
                    <NavbarLogo />
                    <MobileNavToggle
                        isOpen={mobileMenuOpen}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    />
                </MobileNavHeader>

                <MobileNavMenu
                    isOpen={mobileMenuOpen}
                    onClose={() => setMobileMenuOpen(false)}
                >
                    {navItems.map((item, idx) => (
                        <MobileAnimatedMenuItem
                            key={idx}
                            name={item.name}
                            link={item.link}
                            onClick={(e) => {
                                if (item.isContact) {
                                    handleContactClick(e);
                                } else {
                                    setMobileMenuOpen(false);
                                }
                            }}
                        />
                    ))}
                </MobileNavMenu>
            </MobileNav>
        </>
    )
}
