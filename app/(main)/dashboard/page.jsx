import { checkUser } from "@backend/security/checkUser";

export default async function DashboardPage() {
  const user = await checkUser();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="glass-card p-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">
          Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}
        </h1>
        <p className="text-muted-foreground">
          Dashboard coming in the next build...
        </p>
      </div>
    </div>
  );
}
