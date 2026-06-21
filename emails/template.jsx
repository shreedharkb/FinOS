import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export default function EmailTemplate({
  userName = "",
  type = "monthly-report",
  data = {},
}) {
  if (type === "monthly-report") {
    return (
      <Html>
        <Head />
        <Preview>Your Monthly Financial Report</Preview>
        <Body style={main}>
          <Container style={container}>
            <Heading style={h1}>Monthly Report</Heading>
            <Text style={text}>Hello {userName},</Text>
            <Text style={text}>
              Here is your financial summary for {data?.month}:
            </Text>

            {/* Stats */}
            <Section style={statsContainer}>
              <div style={stat}>
                <Text style={text}>Total Income</Text>
                <Text style={heading}>${data?.stats.totalIncome}</Text>
              </div>
              <div style={stat}>
                <Text style={text}>Total Expenses</Text>
                <Text style={heading}>${data?.stats.totalExpenses}</Text>
              </div>
            </Section>

            {/* AI Insights */}
            {data?.insights && (
              <Section style={section}>
                <Heading style={h2}>FinOS AI Insights</Heading>
                {data.insights.map((insight, index) => (
                  <Text key={index} style={text}>
                    • {insight}
                  </Text>
                ))}
              </Section>
            )}
          </Container>
        </Body>
      </Html>
    );
  }

  if (type === "budget") {
    return (
      <Html>
        <Head />
        <Preview>Budget Alert</Preview>
        <Body style={main}>
          <Container style={container}>
            <Heading style={h1}>Budget Alert</Heading>
            <Text style={text}>Hello {userName},</Text>
            <Text style={text}>
              You've used {data?.percentageUsed.toFixed(1)}% of your monthly
              budget.
            </Text>
            <Section style={statsContainer}>
              <div style={stat}>
                <Text style={text}>Spent</Text>
                <Text style={heading}>${data?.totalExpenses}</Text>
              </div>
              <div style={stat}>
                <Text style={text}>Budget</Text>
                <Text style={heading}>${data?.budgetAmount}</Text>
              </div>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  }
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const section = {
  padding: "0 48px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  padding: "0 48px",
  margin: "40px 0 0",
};

const h2 = {
  color: "#333",
  fontSize: "20px",
  fontWeight: "bold",
  margin: "20px 0 10px",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  padding: "0 48px",
  margin: "16px 0",
};

const heading = {
  color: "#333",
  fontSize: "32px",
  fontWeight: "bold",
  margin: "10px 0",
};

const statsContainer = {
  margin: "32px 48px",
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#f9f9f9",
  padding: "20px",
  borderRadius: "8px",
};

const stat = {
  flex: 1,
  textAlign: "center",
};
