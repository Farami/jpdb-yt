import useSettingsStore, { FuriganaDisplay } from "@src/store/settings";
import Checkbox from "@src/components/atoms/Checkbox";
import Label from "@src/components/atoms/Label";
import Input from "@src/components/atoms/Input";
import Select from "@src/components/atoms/Select";
import useDecks from "@src/hooks/useDecks";

const Popup = () => {
  const [settings, setSettings] = useSettingsStore();
  const decks = useDecks();

  return (
    <div className="py-2 px-6 w-96 dark:bg-neutral-800">
      <header className="font-bold text-lg pb-6 dark:text-white">
        jpdb.io youtube subtitle parser
      </header>

      <div className="flex flex-col justify-center">
        <Label text="API token" htmlFor="token" />
        <Input
          id="token"
          value={settings.token}
          onChange={(token) => setSettings((prev) => ({ ...prev, token }))}
        />

        <Label text="Mining Deck" htmlFor="miningDeck" />
        <Select
          id="miningDeck"
          value={settings.miningDeckId?.toString()}
          onChange={(miningDeckId) =>
            setSettings((prev) => ({
              ...prev,
              miningDeckId: parseInt(miningDeckId),
            }))
          }
        >
          {decks.map(({ id, name }) => (
            <option value={id.toString()}>{name}</option>
          ))}
        </Select>

        <Label text="Show Furigana" htmlFor="furiganaDisplay" />
        <Select
          id="furiganaDisplay"
          value={settings.furiganaDisplay}
          onChange={(value) =>
            setSettings((prev) => ({
              ...prev,
              furiganaDisplay: value as FuriganaDisplay,
            }))
          }
        >
          <option value="always">always</option>
          <option value="unknown">on unknown</option>
          <option value="never">never</option>
        </Select>

        <Checkbox
          label="Parse automatically"
          checked={settings.autoParse}
          onChange={() =>
            setSettings((prev) => ({
              ...prev,
              autoParse: !prev.autoParse,
            }))
          }
        />
      </div>
    </div>
  );
};

export default Popup;
