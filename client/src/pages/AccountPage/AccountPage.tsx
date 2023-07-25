import Alert from "../../components/Alert";
import SideNav from "../../components/SideNav/SideNav";
import AccountSideNav from "./AccountSideNav";
import BasicTierCard from "./BasicTierCard";
import FreeTierCard from "./FreeTierCard";
import PremiumTierCard from "./PremiumTierCard";
import GeneralDetails from "./PersonalInformation";
import { CardDetails } from "./CardDetails";
import AddCardPayment from "./AddCardPayment";
import BillingHistory from "./BillingHistory";
import { bindActionCreators } from "redux";
import { actionCreators } from "state";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const AccountPage = () => {
  const dispatch = useDispatch();

  const { initializeUser } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    initializeUser();
  }, []);

  return (
    <div className="flex min-h-screen bg-background-dumpster text-black-dumpster overflow-y-auto">
      <Alert />
      <div className="w-64 bg-slate-50">
        <SideNav />
      </div>
      {/* <AccountSideNav /> */}
      <div className="mx-auto flex flex-col w-3/4 py-8 px-6 ">
        <div className="grid grid-cols-2 gap-x-4 py-2 w-full">
          <GeneralDetails />
          <CardDetails />
        </div>
        <section className="grid grid-cols-3 gap-x-6 mt-8 w-full">
          <FreeTierCard />
          <BasicTierCard />
          <PremiumTierCard />
        </section>
        <section className="mt-6">
          <BillingHistory />
        </section>

        {/* <h1 className="text-4xl mb-8">Billing & Account</h1>
                <BillingDetails />
                <div className="my-6">
                  <TierCard />
                </div>
                <BillingHistory />
                <PaymentSection />
                <AccountSettings />
                <UserManagement /> */}
      </div>
    </div>
  );
};

export default AccountPage;
