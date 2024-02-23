import { CreateVideo } from "~/components/create-video";
import { Layout } from "~/components/layout";

export default function UploadVideoPage() {
  return (
    <Layout>
      <div className="mt-10 flex w-full items-center justify-center overflow-hidden">
        <div className="w-full max-w-lg">
          <CreateVideo />
        </div>
      </div>
    </Layout>
  );
}
