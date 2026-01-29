import { AlertTriangle } from "lucide-react";

export function AlertBanner() {
    return (
        <div className="bg-amber-100 border-b border-amber-200 text-amber-900 border-l-[6px] border-l-amber-600 px-4 py-3" role="alert">
            <div className="container mx-auto flex items-start md:items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-700 shrink-0 mt-0.5 md:mt-0" />
                <div>
                    <span className="font-bold mr-2">URGENT ALERT:</span>
                    <span className="font-medium">Nationwide surge in UPI phishing and OTP fraud reported. Verify all payment requests.</span>
                </div>
            </div>
        </div>
    );
}
