import { FileDto } from 'src/app/models/file/fileDtos';

export function createFileFromDto(fileDto: FileDto): File {
  const byteCharacters = atob(fileDto.fileContent);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  const options = { type: fileDto.fileType };

  const blob = new Blob([byteArray], options);

  const file = new File([blob], fileDto.fileName);

  return file;
}
