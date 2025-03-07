export default function BackgroundImage() {
    return (
      <div data-svg-wrapper>
        {/* 
          Используем обычный тег <img>,
          указывая путь '/background.svg' (без точки в начале).
        */}
        <img src="/background.svg" alt="Background" className="w-full h-auto" />
      </div>
    );
  }
  