import DemoPage from "./pages/table";

const App = () => {
  return (
    <div className=" text-foreground relative">
      <div className="absolute inset-0 -z-10 size-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute inset-x-0 top-0 -z-10 m-auto size-[310px] rounded-full bg-primary opacity-20 blur-[100px]" />
      </div>
      <DemoPage />
    </div>
  );
};

export default App;
