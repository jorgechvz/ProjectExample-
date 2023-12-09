"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Transition } from "@headlessui/react";
import { Testimonial } from "@/lib/types";

export default function Testimonials({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number>(0);
  const [autorotate, setAutorotate] = useState<boolean>(true);
  const autorotateTiming: number = 7000;

  useEffect(() => {
    if (!autorotate) return;
    const interval = setInterval(() => {
      setActive(
        active + 1 === testimonials.length ? 0 : (active) => active + 1
      );
    }, autorotateTiming);
    return () => clearInterval(interval);
  }, [active, autorotate]);

  const heightFix = () => {
    if (testimonialsRef.current && testimonialsRef.current.parentElement)
      testimonialsRef.current.parentElement.style.height = `${testimonialsRef.current.clientHeight}px`;
  };

  useEffect(() => {
    heightFix();
  }, []);

  return (
    <div className="mt-9 py-20 bg-persian-green-950 text-persian-green-50">
      <div>
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Our Clients Love Us
        </h2>
      </div>
      <div className="w-full max-w-2xl mx-auto text-center">
        {/* Testimonial image */}
        <div className="relative h-32">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[360px] h-[360px] pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-b before:from-persian-green-100/25 before:via-persian-green-100/5 before:via-25% before:to-persian-green-100/0 before:to-75% before:rounded-full before:-z-10">
            <div className="h-32">
              {testimonials.map((testimonial, index) => (
                <Transition
                  key={index}
                  show={active === index}
                  className="absolute inset-0 h-full -z-10"
                  enter="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700 order-first"
                  enterFrom="opacity-0 -rotate-[60deg]"
                  enterTo="opacity-100 rotate-0"
                  leave="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700"
                  leaveFrom="opacity-100 rotate-0"
                  leaveTo="opacity-0 rotate-[60deg]"
                >
                  <Image
                    className="relative top-11 left-1/2 -translate-x-1/2 rounded-full"
                    src={testimonial.img}
                    width={56}
                    height={56}
                    alt={testimonial.name}
                  />
                </Transition>
              ))}
            </div>
          </div>
        </div>
        {/* Text */}
        <div className="mb-9 transition-all duration-150 delay-300 ease-in-out">
          <div className="px-2 relative flex flex-col" ref={testimonialsRef}>
            {testimonials.map((testimonial, index) => (
              <Transition
                key={index}
                show={active === index}
                enter="transition ease-in-out duration-500 delay-200 order-first"
                enterFrom="opacity-0 -translate-x-4"
                enterTo="opacity-100 translate-x-0"
                leave="transition ease-out duration-300 delay-300 absolute"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 translate-x-4"
                beforeEnter={() => heightFix()}
              >
                <div className="text-2xl font-medium text-slate-900 before:content-['\201C'] after:content-['\201D']">
                  {testimonial.quote}
                </div>
              </Transition>
            ))}
          </div>
        </div>
        {/* Buttons */}
        <div className="flex flex-wrap justify-center">
          {testimonials.map((testimonial, index) => (
            <button
              key={index}
              className={`inline-flex justify-center whitespace-nowrap rounded-full px-3 py-1.5 m-1.5 text-xs shadow-sm focus-visible:outline-none focus-visible:ring focus-visible:ring-persian-green-950 dark:focus-visible:ring-blue-charcoal-950 transition-colors duration-150 ${
                active === index
                  ? "bg-persian-green-50 text-persian-green-950 shadow-persian-green-50/10"
                  : "hover:bg-persian-green-50 hover:text-persian-green-950 text-persian-green-50"
              }`}
              onClick={() => {
                setActive(index);
                setAutorotate(false);
              }}
            >
              <span>{testimonial.name}</span>{" "}
              <span
                className={`${
                  active === index
                    ? "text-blue-charcoal-900"
                    : "text-black-bean-600"
                }`}
              >
                -
              </span>{" "}
              <span>{testimonial.role}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
