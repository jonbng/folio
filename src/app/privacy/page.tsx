// Example usage: Place this in pages/privacy.jsx or import into another page

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Jonathan Bangert",
  description: "Privacy policy for Jonathan Bangert.",
};

export default function PrivacyPolicy() {
  const contactEmail = "privacy@jonathanb.dk";
  const contactLink = `mailto:${contactEmail}`;

  return (
    <div className="prose mx-auto max-w-3xl px-4 py-8 text-gray-700 bg-white">
      {/* Using prose classes for nice typography defaults */}
      {/* max-w-3xl for readability width, mx-auto to center, px-4 py-8 for padding */}
      {/* text-gray-700 for base text color */}

      <h1 className="text-3xl font-bold text-gray-900">
        Privacy Policy for Folio Guestbook (jonathanb.dk)
      </h1>
      <p className="text-sm italic text-gray-500">
        Last Updated: April 23, 2025
      </p>

      <p>
        This Privacy Policy explains how Jonathan Bangert (&quot;we&quot;,
        &quot;us&quot;, or &quot;our&quot;) collects, uses, and protects your
        information when you use the guestbook feature on the Folio website
        (jonathanb.dk).
      </p>

      <h2 className="mt-6 text-2xl font-semibold text-gray-900">
        1. Information We Collect
      </h2>
      <ul className="ml-6 list-disc space-y-2">
        <li>
          <strong>Information via Authentication:</strong> When you sign in
          using Google, GitHub, or Twitter/X, we receive your{" "}
          <strong className="font-medium text-gray-900">Name</strong>,{" "}
          <strong className="font-medium text-gray-900">Profile Picture</strong>
          , and a unique{" "}
          <strong className="font-medium text-gray-900">User ID</strong> from
          the provider. We use the User ID solely to associate your account with
          your messages. We do{" "}
          <strong className="font-medium text-gray-900">not</strong> collect or
          store your email address from these services.
        </li>
        <li>
          <strong>Information You Provide:</strong> You submit your{" "}
          <strong className="font-medium text-gray-900">
            Guestbook Message
          </strong>{" "}
          and choose a{" "}
          <strong className="font-medium text-gray-900">Balloon Color</strong>.
        </li>
        <li>
          <strong>Automatically Collected Information:</strong> We automatically
          record the{" "}
          <strong className="font-medium text-gray-900">Timestamp</strong> when
          you submit a message.
        </li>
      </ul>

      <h2 className="mt-6 text-2xl font-semibold text-gray-900">
        2. How We Use Your Information
      </h2>
      <p>We use the collected information solely to:</p>
      <ul className="ml-6 list-disc space-y-2">
        <li>
          Display your guestbook entry publicly on jonathanb.dk, including your
          Name, Profile Picture, Message, Timestamp, and chosen Balloon Color.
        </li>
        <li>
          Operate and maintain the guestbook service, including preventing spam.
        </li>
      </ul>

      <h2 className="mt-6 text-2xl font-semibold text-gray-900">
        3. Authentication Providers
      </h2>
      <p>
        Authentication is handled by third-party services (Google, GitHub,
        Twitter/X). Your interaction with these services is governed by their
        respective privacy policies, which we encourage you to review.
      </p>

      <h2 className="mt-6 text-2xl font-semibold text-gray-900">
        4. Data Storage and Sharing
      </h2>
      <ul className="ml-6 list-disc space-y-2">
        <li>
          Your guestbook data (Name, Profile Picture URL, User ID, Message,
          Timestamp, Balloon Color) is stored using Upstash.
        </li>
        <li>
          The website and guestbook functionality are processed via Vercel.
        </li>
        <li>
          We do not sell or share your personal information with other third
          parties, except as necessary to provide the service (i.e., with our
          hosting and database providers) or if required by law.
        </li>
      </ul>

      <h2 className="mt-6 text-2xl font-semibold text-gray-900">
        5. Data Retention
      </h2>
      <p>
        We store your guestbook entries indefinitely to maintain the integrity
        of the guestbook. You can request the deletion of your specific entries
        (see Your Rights).
      </p>

      <h2 className="mt-6 text-2xl font-semibold text-gray-900">
        6. Your Rights
      </h2>
      <ul className="ml-6 list-disc space-y-2">
        <li>
          You can <strong className="font-medium text-gray-900">edit</strong>{" "}
          the content of your own guestbook messages after posting.
        </li>
        <li>
          You can request the{" "}
          <strong className="font-medium text-gray-900">deletion</strong> of
          your guestbook messages and associated data (Name, Profile Picture
          link, User ID) by contacting us at{" "}
          <a
            href={contactLink}
            className="text-blue-600 underline hover:text-blue-800"
          >
            {contactEmail}
          </a>
          . We will process deletion requests promptly.
        </li>
      </ul>

      <h2 className="mt-6 text-2xl font-semibold text-gray-900">7. Cookies</h2>
      <p>
        We use necessary cookies provided by Auth.js to manage your login
        session and authentication. We do not use cookies for tracking or
        advertising.
      </p>

      <h2 className="mt-6 text-2xl font-semibold text-gray-900">
        8. Children&apos;s Privacy
      </h2>
      <p>
        Our service is not directed towards children under the age of 13. We do
        not knowingly collect personal information from children under 13. If we
        become aware that we have collected such information, we will take steps
        to delete it.
      </p>

      <h2 className="mt-6 text-2xl font-semibold text-gray-900">
        9. Changes to This Policy
      </h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you
        of any changes by posting the new policy on this page.
      </p>

      <h2 className="mt-6 text-2xl font-semibold text-gray-900">
        10. Contact Us
      </h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us
        at:{" "}
        <a
          href={contactLink}
          className="text-blue-600 underline hover:text-blue-800"
        >
          {contactEmail}
        </a>
      </p>
    </div>
  );
}
