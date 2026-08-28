import type { NextConfig } from "next";

// Redirects: dated slugs → date-free slugs (permanent 301 for SEO)
const dated: [string, string][] = [
  ["2025-05-01-classical-apologetics-and-neutrality", "classical-apologetics-and-neutrality"],
  ["2025-07-07-divine-impassibility-and-the-knowledge-of-god", "divine-impassibility-and-the-knowledge-of-god"],
  ["2025-07-17-proving-the-being-of-god-from-the-works-of-creation-by-john-gill", "proving-the-being-of-god-from-the-works-of-creation-by-john-gill"],
  ["2025-08-25-assertions-on-natural-theology-from-romans-1", "assertions-on-natural-theology-from-romans-1"],
  ["2025-08-28-shedds-ontological-argument", "shedds-ontological-argument"],
  ["2025-09-10-proof-from-the-idea-of-a-necessary-being", "proof-from-the-idea-of-a-necessary-being"],
  ["2025-10-23-reformed-classical-apologetics-foundations", "reformed-classical-apologetics-foundations"],
  ["2025-11-24-a-depressed-psalmist-and-the-black-cloud", "a-depressed-psalmist-and-the-black-cloud"],
  ["2026-01-01-divine-simplicity-part-1", "divine-simplicity-part-1"],
  ["2026-01-02-divine-simplicity-part-2", "divine-simplicity-part-2"],
  ["2026-01-03-concernment-and-conference", "concernment-and-conference"],
  ["2026-01-04-thomistic-thesis-1-potency-and-act", "thomistic-thesis-1-potency-and-act"],
  ["2026-01-05-finitum-non-capax-infiniti-part-2", "finitum-non-capax-infiniti-part-2"],
  ["2026-01-06-finitum-non-capax-infiniti-part-1", "finitum-non-capax-infiniti-part-1"],
  ["2026-01-07-the-24-thomistic-theses", "the-24-thomistic-theses"],
  ["2026-01-08-developing-robust-natural-theology", "developing-robust-natural-theology"],
  ["2026-01-09-what-is-classical-theism", "what-is-classical-theism"],
  ["2026-01-10-aquinas-beatific-vision", "aquinas-beatific-vision"],
  ["2026-01-11-rc-sproul-classical-theism", "rc-sproul-classical-theism"],
  ["2026-01-12-without-parts-reformed-orthodoxy", "without-parts-reformed-orthodoxy"],
  ["2026-06-19-divine-simplicity", "divine-simplicity"],
  ["2026-06-26-links", "links"],
  ["2026-06-27-aquinas-limitation-of-act-by-potency", "aquinas-limitation-of-act-by-potency"],
  ["2026-06-28-objections-to-classical-apologetics", "objections-to-classical-apologetics"],
  ["2026-06-29-reading-thomas-aquinas-tips-for-beginners", "reading-thomas-aquinas-tips-for-beginners"],
  ["2026-06-30-proving-being-of-god-john-gill", "proving-being-of-god-john-gill"],
  ["2026-06-30-what-is-natural-theology", "what-is-natural-theology"],
  ["2026-07-01-critique-of-critique-1689-federalism", "critique-of-critique-1689-federalism"],
  ["2026-07-06-natural-theology-and-natural-revelation", "natural-theology-and-natural-revelation"],
  ["2026-07-07-act-is-perfection", "act-is-perfection"],
  ["2026-07-07-analogy-of-being", "analogy-of-being"],
  ["2026-07-07-one-god-unique-and-simple", "one-god-unique-and-simple"],
  ["2026-07-08-philosophical-theology-an-introduction-with-james-dolezal", "philosophical-theology-an-introduction-with-james-dolezal"],
  ["2026-07-20-more-on-what-is-natural-theology", "more-on-what-is-natural-theology"],
  ["2026-07-20-natural-theology-as-a-reformed-principle", "natural-theology-as-a-reformed-principle"],
  ["2026-07-22-1689-federalism-what-is-it-brandon-adams-interview", "1689-federalism-what-is-it-brandon-adams-interview"],
  ["2026-07-22-two-tier-typology-and-the-old-covenant-response-to-reformed-forum", "two-tier-typology-and-the-old-covenant-response-to-reformed-forum"],
  ["2026-07-27-natural-theology-and-its-roles", "natural-theology-and-its-roles"],
  ["2026-08-10-natural-theology-and-christian-witness", "natural-theology-and-christian-witness"],
  ["2026-08-13-trinity-the-supreme-treasure", "trinity-the-supreme-treasure"],
  ["2026-08-18-particular-baptist-online-resources", "particular-baptist-online-resources"],
  ["2026-08-20-for-us-and-for-our-salvation-reformation-month-conference", "for-us-and-for-our-salvation-reformation-month-conference"],
  ["2026-08-20-john-owen-17-differences-mosaic-covenant-grace", "john-owen-17-differences-mosaic-covenant-grace"],
  ["2026-08-23-natural-theology-and-christian-contemplation", "natural-theology-and-christian-contemplation"],
  ["2026-08-26-against-kenoticism-an-engagement-and-critique", "against-kenoticism-an-engagement-and-critique"],
  ["2026-08-27-political-theology-17th-century-particular-baptists", "political-theology-17th-century-particular-baptists"],
  ["2026-09-14-natural-theology-and-the-beatific-vision", "natural-theology-and-the-beatific-vision"],
];

const nextConfig: NextConfig = {
  async redirects() {
    return dated.map(([from, to]) => ({
      source: `/blog/${from}`,
      destination: `/blog/${to}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
