import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Plus_Jakarta_Sans } from "next/font/google";
import FloatingLines from "@/components/ui/floating-lines";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700", "800"],
});

const BOX_STYLE = {
  height: "3.25rem",
  fontSize: "1.05rem",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "0.75rem",
  width: "100%",
  outline: "none",
  boxShadow: "none",
};

export default function SignInPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-10">
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, width: '100%', height: '100%' }}>
        <FloatingLines
          linesGradient={["#5227FF", "#06b6d4", "#FF9FFC"]}
          animationSpeed={1.5}
          mixBlendMode="normal"
        />
      </div>
      <div className="absolute top-1/2 left-1/2 z-[1] h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="z-10 w-full flex items-center justify-center">
        <SignIn
          appearance={{
            baseTheme: dark,
            variables: {
              colorPrimary: "#22d3ee", // Cyan color for buttons
              colorBackground: "#120F17",
              colorInputBackground: "rgba(255,255,255,0.04)",
              colorInputText: "#ffffff",
              colorText: "#ffffff",
              colorTextSecondary: "#a1a1aa",
              colorTextOnPrimaryBackground: "#ffffff",
              colorDanger: "#f87171",
              borderRadius: "0.75rem",
              spacingUnit: "1.4rem",
              fontSize: "1.05rem",
            },
            layout: {
              socialButtonsVariant: "blockButton",
            },
            elements: {
              rootBox: {
                width: "100%",
                maxWidth: "680px",
                minWidth: "640px",
              },
              cardBox: {
                width: "100%",
                maxWidth: "680px",
                minWidth: "640px",
                boxShadow: "0 0 80px rgba(0,0,0,0.6)",
              },
              card: {
                width: "100%",
                maxWidth: "680px",
                minWidth: "640px",
                background: "rgba(18,15,23,0.95)",
                backdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "2rem",
                padding: "3rem 3rem",
              },
              headerTitle: {
                fontFamily: plusJakarta.style.fontFamily,
                fontSize: "2.75rem",
                fontWeight: 800,
                letterSpacing: "-0.025em",
                color: "#ffffff",
                lineHeight: 1.15,
              },
              headerSubtitle: {
                fontSize: "1.15rem",
                color: "#a1a1aa",
                marginTop: "0.75rem",
              },
              socialButtonsBlockButton: {
                fontWeight: 600,
                color: "#ffffff",
                cursor: "pointer",
              },
              socialButtonsBlockButtonText: {
                fontSize: "1.05rem",
                fontWeight: 600,
              },
              dividerLine: {
                background: "rgba(255,255,255,0.1)",
              },
              dividerText: {
                color: "#71717a",
                fontSize: "1rem",
              },
              form: {
                width: "100%",
              },
              formFieldLabel: {
                fontSize: "1.05rem",
                fontWeight: 600,
                color: "#e4e4e7",
                marginBottom: "0.4rem",
              },
              formFieldInput: {
                color: "#ffffff",
                paddingLeft: "1rem",
                paddingRight: "1rem",
              },
              formFieldInputShowPasswordButton: {
                color: "#71717a",
              },
              formButtonPrimary: {
                fontWeight: 700,
                fontSize: "1.05rem",
                color: "#ffffff",
                cursor: "pointer",
                marginTop: "0.5rem",
              },
              footerAction: {
                fontSize: "1.05rem",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              },
              footerActionLink: {
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "1.05rem",
              },
              footer: {
                fontSize: "1rem",
                width: "100%",
              },
              footerPagesLink: {
                fontSize: "1rem",
              },
              identityPreview: {
                display: "flex",
                alignItems: "center",
                padding: "0 1rem",
              },
              identityPreviewText: {
                fontSize: "1.05rem",
                color: "#ffffff",
              },
              identityPreviewEditButton: {
                color: "#22d3ee",
              },
              formFieldAction: {
                color: "#22d3ee",
                fontSize: "0.9rem",
              },
              otpCodeFieldInput: {
                textAlign: "center",
                fontSize: "1.25rem",
                color: "#ffffff",
              },
            },
          }}
        />
      </div>
    </div>
  );
}
