import PageHeader from "../components/log-interaction/PageHeader";
import StatsCards from "../components/log-interaction/StatsCards";
import InteractionTabs from "../components/log-interaction/InteractionTabs";


export default function LogInteraction() {
  return (
    <div className="space-y-8">
      <PageHeader />

      <StatsCards />

      <InteractionTabs />

      
    </div>
  );
}