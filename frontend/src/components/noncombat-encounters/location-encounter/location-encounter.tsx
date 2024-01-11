import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import styles from "./location-encounter.module.scss";
import { useAppDispatch } from "@/state-mgmt/store/hooks";
import { useState } from "react";
import Image from "next/image";
import DCXTile from "@/components/dcx-tile/dcx-tile";
import useWindowDimensions from "@/helpers/window-dimensions";
import { xsScreenWidth } from "@/helpers/global-constants";
import { setEncounterComplete, updateLocationEncounterFinish } from "@/state-mgmt/encounter/encounterSlice";
import DCXAudioPlayer from "@/components/dcx-audio-player/dcx-audio-player";
import { SoundType } from "@/state-mgmt/app/appTypes";
import { DcxTiles, LocationEncounter } from "@dcx/dcx-backend";
import { setPlayButtonClickSound } from "@/state-mgmt/app/appSlice";

interface Props {
  encounter: LocationEncounter;
}

const LocationEncounterComponent: React.FC<Props> = (props: Props) => {
  const { encounter } = props;
  const { width, height } = useWindowDimensions();
  const dispatch = useAppDispatch();

  const [leaveHover, setLeaveHover] = useState(false);

  const handleLeaveClick = () => {
    dispatch(setPlayButtonClickSound(true));
    dispatch(updateLocationEncounterFinish(encounter.id));
  };

  const [newLocation] = encounter?.newLocations||[];

  return (
    <Grid container direction="row" className={styles.main}>
      {encounter && encounter.type && newLocation && encounter.narratedText !== "" && (
        <DCXAudioPlayer
          audioUrl={`/audio/voice/${encounter.type.toLowerCase()}s/${newLocation.toLowerCase()}`}
          soundType={SoundType.VOICE}
        />
      )}
      <Grid container className={styles.container}>
        <Grid container className={styles.backgroundImage}>
          <Image
            src="/img/unity-assets/shared/action_bg_vertical.png"
            height={width <= xsScreenWidth ? 550 : 700}
            width={width <= xsScreenWidth ? 370 : 540}
            quality={100}
          />
        </Grid>
        <Grid container className={styles.headerContainer}>
          <Typography component="span" className={styles.headerText}>
            NEW LOCATION DISCOVERED!
          </Typography>
        </Grid>
        <Grid container className={styles.tileContainer}>
          <DCXTile tileName={newLocation! as DcxTiles} disable={true} />
        </Grid>
        <Grid container className={styles.textContainer}>
          <Typography component="span" className={styles.introText}>
            {encounter.introText}
          </Typography>
          {width > xsScreenWidth && (
            <Typography component="span" className={styles.narratedText}>
              {encounter.narratedText}
            </Typography>
          )}
        </Grid>
        <Grid container className={styles.optionsContainer}>
          <Grid
            container
            className={styles.optionContainer}
            onClick={handleLeaveClick}
            onMouseEnter={() => setLeaveHover(true)}
            onMouseLeave={() => setLeaveHover(false)}
          >
            <Grid container className={styles.divider} />
            <Grid container className={styles.opacityContainer} style={{ opacity: leaveHover ? 0.5 : 0.3 }} />
            <Typography component="span" className={styles.leaveText}>
              LEAVE
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LocationEncounterComponent;
