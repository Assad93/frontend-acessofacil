import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import useConsts from "../../hooks/useConsts";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/ErrorOutline";
import HappyEmoji from "@material-ui/icons/SentimentVerySatisfied";
import Title from "../../ui/components/Title";
import { useHistory } from "react-router";
import Webcam from "react-webcam";
import {
  detectAllFaces,
  detectSingleFace,
  FaceMatcher,
  LabeledFaceDescriptors,
  loadFaceLandmarkModel,
  loadFaceRecognitionModel,
  loadSsdMobilenetv1Model,
  loadTinyFaceDetectorModel,
} from "face-api.js";
import { AuthContext } from "../../store/AuthProvider";
import Container from "../../ui/components/Container";
import FacialRecAnimation from "../../ui/components/FacialRecAnimation";
import {
  Content,
  ErrorMsg,
  Header,
  Instruction,
  Label,
  Loading,
} from "./styles";

function FacialRecAuth() {
  const [API_URL, REQ_SIMPLE_CONFIG, REQ_BLOB_CONFIG] = useConsts();

  let history = useHistory();

  const { userId, countFacialError, setCountFacialError } =
    useContext(AuthContext);

  const webcamRef = useRef(null);
  const imgRef = useRef(null);
  const imgAuxRef = useRef(null);

  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [image, setImage] = useState("");
  const [client, setClient] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadModels() {
      try {
        await loadTinyFaceDetectorModel("/models");
        await loadFaceLandmarkModel("/models");
        await loadFaceRecognitionModel("/models");
        await loadSsdMobilenetv1Model("/models");
      } catch (error) {
        history.push("/error");
      }
    }

    async function asyncFetchUserName() {
      await fetchUserName();
    }

    loadModels();
    // resetting the error counter
    setCountFacialError(0);
    setIsModelLoaded(true);
    asyncFetchUserName();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    automaticCapture();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webcamRef]);

  useEffect(() => {
    if (image) {
      detect();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  useEffect(() => {
    if (error) {
      setImage("");
      //two more chances to miss
      if (countFacialError < 2) {
        automaticCapture();
      } else {
        //logout
        history.push("/login");
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  // eslint-disable-next-line
  const automaticCapture = useCallback(() => {
    setTimeout(() => {
      try {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
      } catch (error) {
        history.push("/error");
      }
    }, 5000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webcamRef]);

  // eslint-disable-next-line
  const detect = useCallback(async () => {
    try {
      setError(false);
      let img = imgRef.current;
      let fullFaceDescriptions = await detectAllFaces(img)
        .withFaceLandmarks()
        .withFaceDescriptors();
      const labels = await loadLabelsAndDescriptions();
      const faceMatcher = new FaceMatcher(labels, 0.6);
      const results = fullFaceDescriptions.map((d) =>
        faceMatcher.findBestMatch(d.descriptor)
      );
      // check if it´s a face and the logged user
      if (results[0] !== undefined && results[0]._distance < 0.6) {
        history.push("/");
      } else {
        setError(true);
        setCountFacialError(countFacialError + 1);
      }
    } catch (error) {
      history.push("/error");
    }
  });

  async function loadLabelsAndDescriptions() {
    try {
      const descriptions = [];
      for (let i = 0; i < 3; i++) {
        const img = await axios.get(
          `${API_URL}/assets/labels/${client}/${i}.jpg`,
          REQ_BLOB_CONFIG
        );
        imgAuxRef.current.src = URL.createObjectURL(img.data);
        const detections = await detectSingleFace(imgAuxRef.current)
          .withFaceLandmarks()
          .withFaceDescriptor();
        descriptions.push(detections.descriptor);
      }
      return new LabeledFaceDescriptors(client, descriptions);
    } catch (error) {
      history.push("/error");
    }
  }

  async function fetchUserName() {
    try {
      const { data } = await axios.get(
        `${API_URL}/accounts/${userId}`,
        REQ_SIMPLE_CONFIG
      );
      setClient(data.owner);
    } catch (error) {
      history.push("/error");
    }
  }

  return (
    <Container>
      <Header>
        <Title size="72">Acesso Fácil</Title>
      </Header>
      <img hidden ref={imgAuxRef} alt="" />
      <Content>
        {error && (
          <>
            <ErrorMsg>
              <ErrorIcon style={{ fontSize: 50 }} /> Não foi possível realizar o
              reconhecimento facial, TENTE NOVAMENTE!
            </ErrorMsg>
          </>
        )}
        {isModelLoaded ? (
          <>
            {image === "" ? (
              <>
                <Instruction>Posicione o seu rosto na câmera</Instruction>
                <Webcam
                  audio={false}
                  height={425}
                  ref={webcamRef}
                  screenshotFormat="image/jpg"
                  width={425}
                  alt=""
                />
                <FacialRecAnimation />
              </>
            ) : (
              <Loading>
                <img src={image} ref={imgRef} hidden alt="" />
                <HappyEmoji
                  style={{
                    fontSize: 100,
                    fontWeight: "bold",
                    color: "#1f46a1",
                  }}
                />
                <Label>Processando...</Label>
                <CircularProgress />
              </Loading>
            )}
          </>
        ) : (
          <Loading>
            <Label>Processando...</Label>
            <CircularProgress />
          </Loading>
        )}
      </Content>
    </Container>
  );
}

export default FacialRecAuth;
