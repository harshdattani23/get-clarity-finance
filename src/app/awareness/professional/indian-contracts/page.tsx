import LessonLayout from "@/app/awareness/LessonLayout";
import { Scale, FileText, AlertTriangle, Users } from 'lucide-react';
import AnimatedDiv from "@/components/animations/AnimatedDiv";

export default function IndianContractsPage() {
  return (
    <LessonLayout
      title="Navigating the Labyrinth of Indian Contracts"
      description="Understanding the legal nuances of agreements in India is critical for risk management. Here’s what you need to know."
      lessonSlug="indian-contracts"
    >
      <AnimatedDiv>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">The Foundation: Indian Contract Act, 1872</h2>
        <p className="mb-4">
          Unlike many Western countries that have modernized their contract laws extensively, the backbone of Indian contract law is still the Act of 1872. While it has been amended, its colonial-era core remains. This means some concepts might seem archaic, but they are legally binding and rigorously tested in Indian courts.
        </p>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg my-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <FileText className="h-6 w-6 text-yellow-700" />
            </div>
            <div className="ml-3">
              <p className="text-md text-yellow-800">
                <strong>Key Principle:</strong> For a contract to be valid, it requires a lawful offer, acceptance, consideration, competent parties, free consent, and a lawful object. These pillars are interpreted strictly.
              </p>
            </div>
          </div>
        </div>
      </AnimatedDiv>

      <AnimatedDiv delay={0.2}>
        <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">Common Pain Points for Foreign Entities</h2>
        <p className="mb-4">
          Navigating contracts in India presents unique challenges that can catch foreign investors and businesses off guard.
        </p>
        
        <ul className="space-y-4 mt-6">
          <li className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-800">Vague and Ambiguous Language</h3>
              <p className="text-gray-600">Many traditional Indian contracts suffer from overly complex, non-specific language. This can lead to differing interpretations and lengthy disputes. Precision is paramount—avoid leaving anything to be &quot;mutually agreed upon later.&quot;</p>
            </div>
          </li>
          <li className="flex items-start">
            <Scale className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-800">Jurisdiction and Dispute Resolution Clauses</h3>
              <p className="text-gray-600">Specifying the jurisdiction (e.g., &quot;Courts of Mumbai&quot;) is vital. Without this, legal battles can span multiple states. While arbitration is becoming popular, the process can still be slower than in other countries. Singapore and London are often preferred as neutral arbitration seats.</p>
            </div>
          </li>
          <li className="flex items-start">
            <Users className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-800">Stamping and Registration</h3>
              <p className="text-gray-600">Certain contracts in India are not legally enforceable unless they are &quot;stamped&quot; with the appropriate government duty and, in some cases, registered. This is a common and costly oversight for foreign companies.</p>
            </div>
          </li>
        </ul>
      </AnimatedDiv>
      
      <AnimatedDiv delay={0.4}>
        <div className="mt-8 p-6 bg-white rounded-xl shadow-md border">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Key Takeaways for Investors</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><span className="font-semibold">Standard Templates are Risky:</span> Do not use your standard international contract templates without thorough review by an Indian legal expert.</li>
                <li><span className="font-semibold">Be Explicit:</span> Clearly define terms, deliverables, payment milestones, termination clauses, and dispute resolution mechanisms. Ambiguity is your enemy.</li>
                <li><span className="font-semibold">Factor in Enforcement Time:</span> Even with a strong contract, be aware that the Indian judicial system is slow. A clear arbitration clause can mitigate this, but not eliminate it entirely.</li>
                <li><span className="font-semibold">Verify Authority:</span> Ensure the person signing the contract on behalf of the Indian party has the legal authority to do so. This can be verified via company board resolutions.</li>
            </ul>
        </div>
      </AnimatedDiv>
    </LessonLayout>
  );
}
