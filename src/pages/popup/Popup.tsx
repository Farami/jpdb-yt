import Checkbox from "@src/components/Checkbox";
import useSettingsStore from "@src/store/settings";

const Popup = () => {
  const [settings, setSettings] = useSettingsStore();

  return (
    <div className="py-2 px-6 w-96 dark:bg-neutral-800">
      <header className="font-bold text-lg pb-6 dark:text-white">
        jpdb.io youtube subtitle parser
      </header>

      <div className="flex flex-col justify-center">
        <Checkbox
          label="Show Subtitles automatically"
          checked={settings.autoShow}
          onChange={(autoShow) =>
            setSettings((prev) => ({
              ...prev,
              autoShow,
            }))
          }
        />
      </div>
    </div>
  );
};

export default Popup;
