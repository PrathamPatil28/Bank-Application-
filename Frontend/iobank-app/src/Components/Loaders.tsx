import { Loader } from "@mantine/core";

const Loaders = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <Loader color="blue" size="xl" />
    </div>
  );
};

export default Loaders;
