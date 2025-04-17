/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaEnvelope, FaGooglePlusG, FaPinterest } from "react-icons/fa";
import Badge from "../ui/Badge";
import { Linkedin, LucideFacebook, Twitter } from "lucide-react";
import Categories from "./Categories";
import Archive from "./Archive";
import HighlightPostCard from "./HighlightPostCard";
import { BiSolidUser } from "react-icons/bi";
import Reply from "./Reply";
import LeaveAReply from "./LeaveAReply";
import PostCard from "./PostCard";
import data from "../../lib/data.json";
import HomeNav from "../home/HomeNav";
import Footer from "../Footer";
import MobileHomeNav from "../home/HomeMobileNav";
import SubNav from "../Navigations/SubNav";

const Blog = () => {
  return (
    <div className="relative">
      <SubNav />
      <HomeNav />
      <MobileHomeNav />
        
      <div className="relative h-[18rem] md:h-[20rem] lg:h-[22rem] w-full ">
        <img
          src="https://preview.colorlib.com/theme/webmag/img/post-1.jpg"
          className="size-full object-cover"
          alt=""
        />
        <div className="absolute top-0 size-full bg-black/20 z-10" />
        <div className="px-[5%] md:px-[10%] pb-6 md:pb-12 absolute bottom-0  mb-auto z-20">
          <div className="flex items-center gap-3 mb-3">
            <Badge title="javascript" className="bg-orange-500" />
            <p className="font-medium text-gray-100">March 27, 2018</p>
          </div>
          <a
            href="#"
            className="text-white font-bold text-2xl md:text-3xl hover:underline"
          >
            Ask HN: Does Anybody Still Use JQuery?
          </a>
        </div>
      </div>
      <div className="px-[4%] md:px-[8%] xl:px-[10%] mt-12 gap-12 flex flex-col lg:flex-row ">
        <div className="flex flex-col gap-12 ">
          <div className="flex gap-6 md:gap-12 ">
            <div className="flex flex-col h-fit gap-3 items-center col-span-1 sticky top-10">
              <div className="size-12 rounded-full flex items-center justify-center border border-gray-200 bg-gray-100/60">
                <LucideFacebook
                  size={20}
                  className=" fill-gray-300 text-gray-300"
                />
              </div>
              <div className="size-12 rounded-full flex items-center justify-center border border-gray-200 bg-gray-100/60">
                <Twitter size={20} className=" fill-gray-300 text-gray-300" />
              </div>
              <div className="size-12 rounded-full flex items-center justify-center border border-gray-200 bg-gray-100/60">
                <FaGooglePlusG
                  size={25}
                  className=" fill-gray-300 text-gray-300"
                />
              </div>
              <div className="size-12 rounded-full flex items-center justify-center border border-gray-200 bg-gray-100/60">
                <FaPinterest
                  size={22}
                  className=" fill-gray-300 text-gray-300"
                />
              </div>
              <div className="size-12 rounded-full flex items-center justify-center border border-gray-200 bg-gray-100/60">
                <Linkedin size={20} className=" fill-gray-300 text-gray-300" />
              </div>
              <div className="size-12 rounded-full flex items-center justify-center border border-gray-200 bg-gray-100/60">
                <FaEnvelope
                  size={20}
                  className=" fill-gray-300 text-gray-300"
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 text-[.95rem] text-gray-600">
              <h2 className="font-bold text-xl md:text-2xl">
                Lorem Ipsum: when, and when not to use it
              </h2>
              <p>
                Do you like Cheese Whiz? Spray tan? Fake eyelashes? That's what
                is Lorem Ipsum to many—it rubs them the wrong way, all the way.
                It's unreal, uncanny, makes you wonder if something is wrong, it
                seems to seek your attention for all the wrong reasons. Usually,
                we prefer the real thing, wine without sulfur based
                preservatives, real butter, not margarine, and so we'd like our
                layouts and designs to be filled with real words, with thoughts
                that count, information that has value.
              </p>
              <p>
                The toppings you may chose for that TV dinner pizza slice when
                you forgot to shop for foods, the paint you may slap on your
                face to impress the new boss is your business. But what about
                your daily bread? Design comps, layouts, wireframes—will your
                clients accept that you go about things the facile way?
                Authorities in our business will tell in no uncertain terms that
                Lorem Ipsum is that huge, huge no no to forswear forever. Not so
                fast, I'd say, there are some redeeming factors in favor of
                greeking text, as its use is merely the symptom of a worse
                problem to take into consideration.
              </p>
              <div>
                <figure className="bg-green-300 md:h-[22rem] lg:h-[20rem] ">
                  <img
                    src="https://preview.colorlib.com/theme/webmag/img/post-4.jpg"
                    className="size-full"
                    alt=""
                  />
                </figure>
                <p className="font-semibold text-sm ">
                  So Lorem Ipsum is bad (not necessarily)
                </p>
              </div>
              <p>
                You begin with a text, you sculpt information, you chisel away
                what's not needed, you come to the point, make things clear, add
                value, you're a content person, you like words. Design is no
                afterthought, far from it, but it comes in a deserved second.
                Anyway, you still use Lorem Ipsum and rightly so, as it will
                always have a place in the web workers toolbox, as things
                happen, not always the way you like it, not always in the
                preferred order. Even if your less into design and more into
                content strategy you may find some redeeming value with, wait
                for it, dummy copy, no less.
              </p>
              <p>
                There's lot of hate out there for a text that amounts to little
                more than garbled words in an old language. The villagers are
                out there with a vengeance to get that Frankenstein, wielding
                torches and pitchforks, wanting to tar and feather it at the
                least, running it out of town in shame.
              </p>
              <p>
                One of the villagers, Kristina Halvorson from Adaptive Path,
                holds steadfastly to the notion that design can't be tested
                without real content:
              </p>
              <div className="relative font-semibold p-5">
                <p className="text-[17rem] text-gray-200 -z-10 absolute left-0 top-0 h-[5rem leading-[13rem]">
                  ``
                </p>
                <p className="">
                  I've heard the argument that “lorem ipsum” is effective in
                  wireframing or design because it helps people focus on the
                  actual layout, or color scheme, or whatever. What kills me
                  here is that we're talking about creating a user experience
                  that will (whether we like it or not) be DRIVEN by words. The
                  entire structure of the page or app flow is FOR THE WORDS.
                </p>
              </div>
              <p>
                If that's what you think how bout the other way around? How can
                you evaluate content without design? No typography, no colors,
                no layout, no styles, all those things that convey the important
                signals that go beyond the mere textual, hierarchies of
                information, weight, emphasis, oblique stresses, priorities, all
                those subtle cues that also have visual and emotional appeal to
                the reader. Rigid proponents of content strategy may shun the
                use of dummy copy but then designers might want to ask them to
                provide style sheets with the copy decks they supply that are in
                tune with the design direction they require.
              </p>
              <h2 className="font-bold text-2xl leading-6">
                Summing up, if the copy is diverting attention from the design
                it’s because it’s not up to task.
              </h2>
              <p>
                Typographers of yore didn't come up with the concept of dummy
                copy because people thought that content is inconsequential
                window dressing, only there to be used by designers who can’t be
                bothered to read. Lorem Ipsum is needed because words matter, a
                lot. Just fill up a page with draft copy about the client’s
                business and they will actually read it and comment on it. They
                will be drawn to it, fiercely. Do it the wrong way and draft
                copy can derail your design review.
              </p>
            </div>
          </div>
          <div className="h-[10rem] bg-gray-100 border border-gray-200" />
          <div className="flex flex-col gap-10 text-gray-700">
            <div className="flex gap-8">
              <div>
                <div className="size-[8rem] overflow-hidden rounded-full flex items-center justify-center bg-gray-200">
                  <BiSolidUser className="size-full mt-5 text-gray-400" />
                </div>
              </div>
              <div className="flex gap-4 w-fit flex-col">
                <h3 className="text-2xl font-bold">John Doe</h3>
                <p className="text-[.9rem]">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <div className="flex h-fit gap-3 items-center col-span-1 sticky top-0">
                  <div className="size-11  flex items-center justify-center border border-gray-200 bg-slate-400 rounded-sm">
                    <LucideFacebook
                      size={20}
                      className=" fill-white text-white"
                    />
                  </div>
                  <div className="size-11  flex items-center justify-center border border-gray-200 bg-slate-400 rounded-sm">
                    <Twitter size={20} className=" fill-white text-white" />
                  </div>
                  <div className="size-11  flex items-center justify-center border border-gray-200 bg-slate-400 rounded-sm">
                    <FaGooglePlusG
                      size={25}
                      className=" fill-white text-white"
                    />
                  </div>
                  <div className="size-11  flex items-center justify-center border border-gray-200 bg-slate-400 rounded-sm">
                    <FaEnvelope size={20} className=" fill-white text-white" />
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <h3 className="text-2xl font-bold mb-6">3 Comments</h3>
              <div className="flex flex-col gap-6 *:border-t *:first:border-t-0 *:border-gray-200">
                <Reply />
                <div className="ml-[4rem] md:ml-[7rem]">
                  <Reply />
                </div>
                <Reply />
              </div>
            </div>
            <LeaveAReply />
          </div>
        </div>
        <div className="flex flex-col gap-16 lg:w-1/3">
          <div className="w-[19rem] h-[16rem] mx-auto border border-gray-200" />
          {/* Most Read */}
          <div className="">
            <h2 className="text-3xl mb-12 font-bold">Most Read</h2>
            <div className="grid grid-cols-1 gap-8 ">
              {data.slice(0, 4).map((post) => (
                <PostCard small className="flex-col !gap-2" post={post} />
              ))}
            </div>
          </div>
          {/* Featured Posts */}
          <div className="">
            <h2 className="text-3xl mb-12 font-bold">Featured Posts</h2>
            <div className="grid grid-cols-1 gap-8 ">
              {data.slice(0, 2).map((post) => (
                <HighlightPostCard post={post} className="!h-[15rem]" />
              ))}
            </div>
          </div>
          <Categories />
          <Archive />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
