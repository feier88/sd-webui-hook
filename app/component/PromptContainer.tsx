import { useDispatch } from "react-redux";
import { useSelector } from "../hook/useSelector.hook";
import { setSettings as setTxt2imgSettings } from "../redux/Features/Txt2imgState/Txt2imgSlice";
import { setSettings as setImg2imgSettings } from "../redux/Features/Img2imgState/Img2imgSlice";
import { useEffect, useState } from "react";

interface PromptContainerProps {
  mode: number;
  display?: boolean | true;
  prompt_default?: string;
  negative_prompt_default?: string;
}

export const PromptContainer = (props: PromptContainerProps) => {
  const { mode, prompt_default, negative_prompt_default, display } = props;
  const [prompt, setPrompt] = useState("");
  const [negative_prompt, setNegativePrompt] = useState("");
  const getSettings = (state, mode) => {
    if(mode === 0) {
      return state.txt2img.settings; 
    } else {
      return state.img2img.settings;
    }
  }

  const settings = useSelector(state => getSettings(state, mode));
  const getSetSettings = (mode) => {
    if(mode === 0) {
      return setTxt2imgSettings;
    } else {
      return setImg2imgSettings;
    } 
  }

  const setSettings = getSetSettings(mode);
  
  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    setPrompt(e.target.value);
    dispatch(
      setSettings({
        ...settings,
        prompt: e.target.value + ", " + prompt_default,
      })
    );
  };

  const handleNegativeChange = (e: any) => {
    setNegativePrompt(e.target.value);
    dispatch(
      setSettings({
        ...settings,
        negative_prompt: e.target.value + ", " + negative_prompt_default,
      })
    );
  };

  useEffect(() => {
    console.log("prompt_default", prompt_default);
    dispatch(
      setSettings({
        ...settings,
        prompt: prompt_default,
        negative_prompt: negative_prompt_default,
      })
    );
  }, [dispatch, prompt, negativePrompt, setSettings, settings]);

  return (
    <div>
      <div>
        <label htmlFor="prompt">Prompt</label>
        <textarea value={prompt} onChange={handleChange} />
      </div>
      {display && (
        <div>
          <label htmlFor="negative_prompt">Negative Prompt</label>
          <textarea value={negative_prompt} onChange={handleNegativeChange} />
        </div>
      )}
    </div>
  );
};
