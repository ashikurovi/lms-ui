"use client";

import React from "react";

export const servicesData = {
  column1: [
    {
      title: "BIM Services",
      items: [
        "3D BIM Modeling",
        "Scan To BIM",
        "PDF / CAD To BIM",
        "Clash Detection Coordination",
        "Revit Family Creation",
      ],
    },
    {
      title: "Architectural Services",
      items: [
        "Architectural 3D Modeling",
        "Architectural Shop Drawings",
        "Construction Document (CD) Set",
        "CAD As Built Drawings",
        "Facade Shop Drawings",
      ],
    },
  ],
  column2: [
    {
      title: "Structural Services",
      items: [
        "3D Structural Modeling",
        "Structural Shop Drawings",
        "Structural Steel Detailing",
        "Precast Detailing",
        "Fabrication Shop Drawings",
      ],
    },
    {
      title: "3D Visualization Rendering",
      items: [
        "Interior Rendering",
        "Exterior Rendering",
        "3D Floor Plan Rendering",
        "3D Walkthrough",
      ],
    },
  ],
  column3: {
    title: "MEPF Services",
    subgroups: [
      {
        subtitle: "MEP Modeling",
        items: [
          "Mechanical Modeling",
          "Electrical Modeling",
          "Plumbing Modeling",
          "Fire Protection Modeling",
        ],
      },
      {
        subtitle: "MEP Drawings",
        items: [
          "Mechanical Drawings",
          "Electrical Drawings",
          "Plumbing Drawings",
          "Fire Protection Drawings",
          "HVAC Duct Drawings",
        ],
      },
      {
        subtitle: "MEP Coordination",
        items: [],
      },
    ],
  },
};

export default function ServicesMegaMenu() {
  return (
    <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-slate-200/90 p-6 lg:p-7 text-slate-800 ring-1 ring-black/5">
      <div className="grid grid-cols-3 gap-6 lg:gap-8">
        {/* Column 1 */}
        <div className="flex flex-col justify-between">
          {/* Top: BIM Services */}
          <div>
            <h3 className="text-[#0b57d0] font-bold text-sm lg:text-[15px] tracking-tight pb-2.5">
              {servicesData.column1[0].title}
            </h3>
            <ul className="space-y-2 pb-4">
              {servicesData.column1[0].items.map((item) => (
                <li key={item}>
                  <span className="text-slate-800 hover:text-[#0b57d0] text-xs lg:text-[13px] font-normal leading-snug transition-colors duration-150 cursor-pointer block select-none">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full border-t border-slate-100 my-1" />

          {/* Bottom: Architectural Services */}
          <div className="pt-2">
            <h3 className="text-[#0b57d0] font-bold text-sm lg:text-[15px] tracking-tight pb-2.5">
              {servicesData.column1[1].title}
            </h3>
            <ul className="space-y-2">
              {servicesData.column1[1].items.map((item) => (
                <li key={item}>
                  <span className="text-slate-800 hover:text-[#0b57d0] text-xs lg:text-[13px] font-normal leading-snug transition-colors duration-150 cursor-pointer block select-none">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col justify-between">
          {/* Top: Structural Services */}
          <div>
            <h3 className="text-[#0b57d0] font-bold text-sm lg:text-[15px] tracking-tight pb-2.5">
              {servicesData.column2[0].title}
            </h3>
            <ul className="space-y-2 pb-4">
              {servicesData.column2[0].items.map((item) => (
                <li key={item}>
                  <span className="text-slate-800 hover:text-[#0b57d0] text-xs lg:text-[13px] font-normal leading-snug transition-colors duration-150 cursor-pointer block select-none">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full border-t border-slate-100 my-1" />

          {/* Bottom: 3D Visualization Rendering */}
          <div className="pt-2">
            <h3 className="text-[#0b57d0] font-bold text-sm lg:text-[15px] tracking-tight pb-2.5">
              {servicesData.column2[1].title}
            </h3>
            <ul className="space-y-2">
              {servicesData.column2[1].items.map((item) => (
                <li key={item}>
                  <span className="text-slate-800 hover:text-[#0b57d0] text-xs lg:text-[13px] font-normal leading-snug transition-colors duration-150 cursor-pointer block select-none">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Column 3: MEPF Services */}
        <div className="flex flex-col">
          <h3 className="text-[#0b57d0] font-bold text-sm lg:text-[15px] tracking-tight pb-2.5">
            {servicesData.column3.title}
          </h3>

          <div className="space-y-3">
            {servicesData.column3.subgroups.map((group) => (
              <div key={group.subtitle} className="space-y-1.5">
                <span className="text-slate-900 hover:text-[#0b57d0] font-bold text-xs lg:text-[13px] transition-colors duration-150 cursor-pointer block select-none">
                  {group.subtitle}
                </span>

                {group.items.length > 0 && (
                  <ul className="space-y-1.5 pl-3">
                    {group.items.map((subItem) => (
                      <li key={subItem}>
                        <span className="text-slate-800 hover:text-[#0b57d0] text-xs lg:text-[13px] font-normal leading-snug transition-colors duration-150 cursor-pointer block select-none">
                          {subItem}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
