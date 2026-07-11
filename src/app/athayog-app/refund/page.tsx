import { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
	title: "Refund Policy | Athayog",
	description: "Athayog Refund Policy",
};

export default function MobileRefundPolicy() {
	return (
		<LegalPage title="REFUND POLICY">
			<section>
				<h2>OVERVIEW</h2>
				<p>
					Certain aspects of the service may be provided for a fee or other
					charges. If you elect to use paid aspects of the service, you agree to
					the terms of sale, pricing, payment and billing policies applicable to
					such fees and charges. Athayog Living may add new services for
					additional fees and charges, or amend the same for existing services, at
					any time in its sole discretion.
				</p>
			</section>

			<section>
				<h2>CANCELLATION</h2>
				<p>
					You may cancel your service or course at any time; however, there are no
					refunds for cancellation. In the event that Athayog Living suspends or
					terminates your account or this agreement, you understand and agree that
					you shall receive no refund or exchange for any unused time on a
					subscription, any license or subscription fees for any portion of the
					service, any content or data associated with your account, or for
					anything else.
				</p>
				<ol>
					<li>
						At Athayog Living, we have a clear &lsquo;No Refund Policy&rsquo;.
						Once yoga centre membership/course is purchased online on our
						platform, there will be no refund. Thus, the buyer is advised to
						make an informed decision while making a purchase on our platform.
					</li>
					<li>Membership once purchased is not transferable.</li>
					<li>
						Please note that Athayog Living&apos;s decision on any refund &amp;
						cancellation policy shall be final &amp; binding.
					</li>
				</ol>
			</section>

			<section>
				<h2>REFUNDS (if applicable)</h2>
				<p>
					Membership/Course cancellation received before said service has been
					used you may be eligible a full refund. Cancellations received after the
					stated deadline will not be eligible for a refund.
				</p>
				<p>
					Cancellations will be accepted via phone or e-mail, and must be received
					by the stated cancellation deadline. In addition:
				</p>
				<ol>
					<li>All refund requests must be made by the member or credit card holder.</li>
					<li>Refund requests must include the name of the member and/or transaction number.</li>
					<li>Refunds will be credited back to the original credit card used for payment.</li>
				</ol>
				<p>
					We will also notify you of the approval or rejection of your refund. If
					you are approved, then your refund will be processed, and a credit will
					automatically be applied to your credit card or original method of
					payment, within a certain 5 - 10 Business Days.
				</p>
			</section>

			<section>
				<h2>LATE OR MISSING REFUNDS (if applicable)</h2>
				<p>
					If you haven&apos;t received a refund yet, first check your bank account
					again. Then contact your credit card company, it may take some time
					before your refund is officially posted.
				</p>
				<p>
					Next contact your bank. There is often some processing time before a
					refund is posted. If you&apos;ve done all of this and you still have not
					received your refund yet, please contact us at{" "}
					<strong>info@athayogliving.com</strong>.
				</p>
			</section>
		</LegalPage>
	);
}
