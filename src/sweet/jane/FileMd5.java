package sweet.jane;

import java.io.File;

/**
 * 文件md5
 * @author hcx
 *
 */
public class FileMd5{
	
	public File file;
	public String md5;

	public FileMd5(File file, String md5) {
		this.file = file;
		this.md5 = md5;
	}

	public File getFile() {
		return file;

	}

	public void setFile(File file) {
		this.file = file;
	}

	public String getMd5() {
		return md5;

	}

	public void setMd5(String md5) {
		this.md5 = md5;

	}

	@Override
	public String toString() {
		return file.getAbsolutePath();

	}

	@Override
	public boolean equals(Object obj) {
		if (obj == null) {
			return false;
		}
		FileMd5 fileMd5 = (FileMd5) obj;
		return this.toString().equals(obj.toString()) && this.getMd5().equals(fileMd5.getMd5());

	}
	

}

