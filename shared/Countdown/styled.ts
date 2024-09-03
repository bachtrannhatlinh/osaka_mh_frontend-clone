import styled from 'styled-components'

export const CountdownStyled = styled.div`
  *,
  *::before,
  *::after {
    padding: 0;
    margin: 0 auto;
    box-sizing: border-box;
  }

  body {
    background-color: #777;
    height: 100vh;
    background-image: linear-gradient(
        black,
        transparent 10%,
        transparent calc(50% - 1px),
        #aaa calc(50% - 1px),
        #aaa calc(50% + 1px),
        transparent calc(50% + 1px),
        transparent 90%,
        black
      ),
      linear-gradient(
        90deg,
        black,
        transparent 10%,
        transparent calc(50% - 1px),
        #aaa calc(50% - 1px),
        #aaa calc(50% + 1px),
        transparent calc(50% + 1px),
        transparent 90%,
        black
      );
  }

  .cont {
    width: 250px;
    height: 250px;
    position: fixed;
    text-align: center;
    font-weight: bold;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid #aaa;
    border-radius: 50%;
    overflow: hidden;

    &::after {
      content: '';
      width: 200px;
      height: 200px;
      position: absolute;
      top: 23px;
      left: 23px;
      border: 1px solid #aaa;
      border-radius: 50%;
      background: #777;
      background-image: linear-gradient(
          transparent calc(50% - 1px),
          #aaa calc(50% - 1px),
          #aaa calc(50% + 1px),
          transparent calc(50% + 1px)
        ),
        linear-gradient(
          90deg,
          transparent calc(50% - 1px),
          #aaa calc(50% - 1px),
          #aaa calc(50% + 1px),
          transparent calc(50% + 1px)
        );
    }
  }

  .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 125px;
    height: 100px;
    transform-origin: 0 0;
    background-image: linear-gradient(black, transparent);
    animation: spin 1s infinite linear;

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(-360deg);
      }
    }
  }

  .number {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    transform: translate(-50%, -50%);
    width: 250px;
    height: 250px;

    .number-count-down {
      content: '';
      width: 250px;
      height: 250px;
      position: absolute;
      top: 0;
      left: 0;
      font-size: 150px;
      line-height: 250px;
     
    }
  }
`
