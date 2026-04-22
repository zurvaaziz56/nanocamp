import { Link } from "react-router-dom";
import LegalPage from "@/components/LegalPage";

const Terms = () => {
  return (
    <LegalPage
      title="Terms of Use — Nano Camp"
      metaDescription="Terms of Use for Nano Camp's limited U.S. market test. Learn about eligibility, gift card terms, and site usage."
      lastUpdated="April 20, 2026"
    >
      <h1>Terms of Use</h1>

      <p><strong>Effective Date:</strong> Apr 20, 2026</p>

      <p>
        This is a pre-launch market test. Product not yet available. No purchase will be completed.
        No payment will be accepted. Provide your name and email and we'll send a $25 gift card for
        participating, subject to terms.
      </p>

      <p>
        This website is a limited U.S. market test for <strong>T Labs LLC</strong> ("T Labs"). The
        product or service shown on this site is not currently available for purchase and may never
        be launched. This site is for research and marketing evaluation only and is not an offer to
        sell goods or services. No order will be completed and no payment will be accepted through
        this site.
      </p>

      <h2>1. Eligibility</h2>
      <p>You must be a U.S. resident and at least 18 years old to participate.</p>

      <h2>2. Participation</h2>
      <p>
        You may provide your name and email address so we can administer this test and send a
        participation gift card.
      </p>

      <h2>3. Accurate Information and Site Use</h2>
      <p>You agree to provide accurate information and not misuse the site.</p>

      <h2>5. Changes to Test</h2>
      <p>
        We may change or end this market test at any time, but changes will not affect gift cards
        already earned under the terms shown when you participated.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, T Labs will not be liable for any indirect,
        incidental, special, consequential, or punitive damages, or for any loss of profits,
        revenue, data, goodwill, or business opportunities, arising out of or related to your use
        of this site or participation in this test. T Labs' total liability for any claim arising
        out of or relating to this site or these Terms will not exceed the greater of $30 or the
        value of the gift card offered to you.
      </p>

      <h2>7. Privacy</h2>
      <p>
        Your use of this site is also subject to our <Link to="/privacy">Privacy Notice</Link>,
        which describes how we collect, use, and disclose information in connection with this
        market test.
      </p>

      <h2>8. Governing Law</h2>
      <p>
        These Terms are governed by the laws of the State of Nevada, without regard to conflict of
        laws principles.
      </p>

      <h2>9. Contact</h2>
      <p>
        Questions about this site or these Terms may be sent to{" "}
        <a href="mailto:support@nano.com">support@nano.com</a>.
      </p>
    </LegalPage>
  );
};

export default Terms;
