import { CheckCircleIcon } from "@heroicons/react/24/solid";

interface Tier {
  name: string;
  features: {
    dumpsters: number;
    landfills: number;
    regions: number;
    ordersPerDay: number;
    routeGenerationsPerDay: number;
  };
}

const PremiumTierCard = () => {
  return (
    <div className="flex flex-col shadow border rounded-lg py-6">
      <section className="flex flex-row px-6">
        <div className="flex flex-col grow">
          <div className="flex items-center mb-2">
            <p className="font-semibold text-xl mr-4">Basic plan</p>
          </div>

          <div className="flex justify-start text-gray-600">
            Basic features and reporting
          </div>
        </div>
        <div>
          <span className="text-2xl">$100</span>
          <span className="text-gray-600">per month</span>
        </div>
      </section>
      <hr className="border-gray-200 my-6 border-t-2" />
      <section className="px-6">
        <h2 className="flex justify-start font-medium mb-2">FEATURES</h2>
        <div className="grid gap-y-3 text-left ml-6 mt-6 text-gray-600 text-sm">
          <p className="flex flex-row items-center"><CheckCircleIcon className="w-5 h-5 mr-2 text-primary"/> Unlimited Regions</p>
          <p className="flex flex-row items-center"><CheckCircleIcon className="w-5 h-5 mr-2 text-primary"/> Unlimited Orders </p>
          <p className="flex flex-row items-center"><CheckCircleIcon className="w-5 h-5 mr-2 text-primary"/> Unlimited Landfills </p>
          <p className="flex flex-row items-center"><CheckCircleIcon className="w-5 h-5 mr-2 text-primary"/> Unlimited Depots </p>
          <p className="flex flex-row items-center"><CheckCircleIcon className="w-5 h-5 mr-2 text-primary"/> 150 Optimizations /day</p>

        </div>
      </section>
    </div>
  );
};

export default PremiumTierCard;