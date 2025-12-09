import Spline from '@splinetool/react-spline';

export default function interactiveBoxesFromSpline() {

  return (
      <div className='w-screen h-screen overflow-hidden'>
          <Spline
            scene="https://prod.spline.design/knVAFwkCJqL0Ov9g/scene.splinecode"
          />
      </div>
  );
}
