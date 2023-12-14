import { Testimonial } from "./types";

export default function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

/* Navbar Const  */
export const navigation = [
  {
    name: "Home",
    key: "home",
    href: "/",
    current: true,
  },
  {
    name: "About",
    key: "about",
    href: "/about",
    current: false,
  },
  {
    name: "Contact",
    key: "contact",
    href: "/contact",
    current: false,
  },
];

export const profileNavigation = [
  {
    name: "Your Dashboard",
    key: "dashbaord",
    href: "/dashboard",
  },
];

/* Testimonials */

export const testimonialsData: Testimonial[] = [
  {
    img: "/testimonials-1.jpg",
    quote:
      "BudgetBuddy has been a game-changer for me in managing my finances. The ability to track my expenses and savings in one place has made my university life at TechHub University much more organized and stress-free.",
    name: "Jessie J",
    role: "TechHub University",
  },
  {
    img: "/testimonials-2.jpg",
    quote:
      "I was searching for a tool to make personal finance easy during my university days, and BudgetBuddy exceeded my expectations. The features are revolutionary, and it has truly simplified the way I handle my money at Quantum University.",
    name: "Nick V",
    role: "Quantum University",
  },
  {
    img: "/testimonials-3.jpg",
    quote:
      "BudgetBuddy's functionality to track expenses is a game-changer. It has made my university life much easier at Harmony University. Even if I get busy, I know my financial information is secure and organized.",
    name: "Peter W",
    role: "Harmony University",
  },
];

/* FAQ Section */

export const faqSection = [
  {
    id: 1,
    question: "What makes BudgetBuddy different?",
    answer:
      "BudgetBuddy stands out as a straightforward budget management application designed to simplify personal finance. Our platform offers an intuitive interface, smart budgeting features, and a commitment to ensuring the security and privacy of your financial information.",
  },
  {
    id: 2,
    question: "How does BudgetBuddy help me manage my finances?",
    answer:
      "BudgetBuddy empowers you to effortlessly track your income, expenses, and savings. With user-friendly interfaces, budget tracking visuals, and goal-setting features, we provide a seamless experience for individuals, especially university students, looking for a simple tool to manage their personal finances.",
  },
  {
    id: 3,
    question: "Is my financial information secure with BudgetBuddy?",
    answer:
      "Absolutely! Ensuring the privacy and security of your financial information is a top priority for BudgetBuddy. We implement robust measures to safeguard your data and give you peace of mind while using our application.",
  },
  {
    id: 4,
    question: "Can I get insights into my spending habits with BudgetBuddy?",
    answer:
      "Yes, BudgetBuddy offers basic financial insights and reports. You can gain a clear understanding of your spending categories and make informed decisions to achieve your financial goals.",
  },
  {
    id: 5,
    question: "How do I get started with BudgetBuddy?",
    answer:
      "Getting started with BudgetBuddy is easy! Simply click on the 'Get Started' button on our homepage, create your account, and begin your journey to financial control and freedom.",
  },
];

/* Footer  */

export const usefulLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];


export const socialLinks = [
  { platform: "Facebook", icon: "/fb-icon.png", href: "#" },
  { platform: "Twitter", icon: "/twitter-icon.png", href: "#" },
  { platform: "Instagram", icon: "/instagram-icon.png", href: "#" },
];

export const contact = [
  { label: "info@budgetbuddy.com" },
  { label: "+1 (123) 456-7890" },
  { label: "123 Main St, Cityville" },
];

