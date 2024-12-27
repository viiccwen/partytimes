import { VerifyAuth } from "@/lib/verify";
import { Navbar } from "@/components/customs/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "privacy",
};

export default async function PrivacyPage() {
  const { isAuth, user } = await VerifyAuth(false);

  return (
    <>
      <Navbar isLogin={isAuth} HasFixed={true} isLoading={false} />
      <div className="w-full h-screen flex justify-center items-center">
        <Card className={cn("p-5 w-[390px]", "md:w-[700px]")}>
          <CardContent className="flex flex-col gap-7">
            <h2 className="text-center text-2xl font-semibold">
              Privacy Policy
            </h2>
            <div className="text-gray-700 space-y-4 text-sm overflow-y-auto max-h-[500px]">
              <p>
                This Privacy Policy governs the manner in which PartyTimes
                collects, uses, maintains, and discloses information collected
                from users (each, a "User") of the https://partytimes.org
                website ("Site").
              </p>
              <h3 className="font-semibold">
                Personal identification information
              </h3>
              <p>
                We may collect personal identification information from Users in
                a variety of ways, including, but not limited to, when Users
                visit our site, register on the site, fill out a form, and in
                connection with other activities, services, features, or
                resources we make available on our Site. Users may be asked for,
                as appropriate, name, email address. Users may also connect
                their personal electronic calendar to our Site, but we do not
                record or store the User's calendar events on our servers. Users
                may, however, visit our Site anonymously. We will collect
                personal identification information from Users only if they
                voluntarily submit such information to us. Users can always
                refuse to supply personal identification information, except
                that it may prevent them from engaging in certain Site-related
                activities.
              </p>
              <h3 className="font-semibold">
                Non-personal identification information
              </h3>
              <p>
                We may collect non-personal identification information about
                Users whenever they interact with our Site. Non-personal
                identification information may include the browser name, the
                type of computer, and technical information about Users' means
                of connection to our Site, such as the operating system and the
                Internet service providers utilized and other similar
                information.
              </p>
              <h3 className="font-semibold">Web browser cookies</h3>
              <p>
                Our Site may use "cookies" to enhance User experience. User's
                web browser places cookies on their hard drive for
                record-keeping purposes and sometimes to track information about
                them. User may choose to set their web browser to refuse cookies
                or to alert them when cookies are being sent. If they do so,
                note that some parts of the Site may not function properly.
              </p>
              <p>
                We use third-party service providers such as Google Analytics to
                provide user and user interaction information in connection with
                our Site. You can opt out of Google Analytics tracking by
                installing the Google Analytics Opt-out Browser tool:
                https://tools.google.com/dlpage/gaoptout. For more information
                on the privacy practices of Google, please visit the Google
                Privacy & Terms web page:
                https://www.google.com/policies/privacy.
              </p>
              <h3 className="font-semibold">
                How we use collected information
              </h3>
              <p>
                PartyTimes may collect and use Users' personal information for
                the following purposes:
                <ul className="list-disc pl-5">
                  <li>
                    To run and operate our Site. We may need your information to
                    display content on the Site correctly.
                  </li>
                  <li>
                    To improve our Site. We may use feedback you provide to
                    improve our products and services.
                  </li>
                  <li>
                    To communicate with you. We may use your email address to
                    send you information and updates, which you may opt out of
                    at any time.
                  </li>
                </ul>
              </p>
              <h3 className="font-semibold">How we protect your information</h3>
              <p>
                We adopt appropriate data collection, storage, and processing
                practices and security measures to protect against unauthorized
                access, alteration, disclosure, or destruction of your personal
                information, username, password, transaction information, and
                data stored on our Site.
              </p>
              <h3 className="font-semibold">
                Sharing your personal information
              </h3>
              <p>
                We do not sell, trade, or rent Users' personal identification
                information to others. We may share generic aggregated
                demographic information not linked to any personal
                identification information regarding visitors and users with our
                business partners, trusted affiliates, and advertisers for the
                purposes outlined above.
              </p>
              <h3 className="font-semibold">Changes to this privacy policy</h3>
              <p>
                PartyTimes has the discretion to update this privacy policy at
                any time. We encourage Users to frequently check this page for
                any changes to stay informed about how we are helping to protect
                the personal information we collect. You acknowledge and agree
                that it is your responsibility to review this privacy policy
                periodically and become aware of modifications.
              </p>
              <h3 className="font-semibold">Your acceptance of these terms</h3>
              <p>
                By using this Site, you signify your acceptance of this policy.
                If you do not agree to this policy, please do not use our Site.
                Your continued use of the Site following the posting of changes
                to this policy will be deemed your acceptance of those changes.
              </p>
              <h3 className="font-semibold">Contacting us</h3>
              <p>
                If you have any questions about this Privacy Policy, the
                practices of this site, or your dealings with this site, please
                contact us at{" "}
                <Link
                  href="/feedback"
                  className="text-blue-400 hover:text-blue-500"
                >
                  feedback
                </Link>
              </p>

              <p className="text-sm italic">
                This document was last updated on December 27, 2024.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
