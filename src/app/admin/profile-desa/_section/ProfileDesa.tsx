import Card from '@/components/cards/Card';
import { InputForm } from '@/components/forms/InputForm';
import LabelForm from '@/components/forms/LabelForm';
import TextareaForm from '@/components/forms/TextareaForm';
import { IconPlus } from '@tabler/icons-react';

export default function ProfileDesa() {
  return (
    <Card>
      <form action="" className="flex gap-5" method="post">
        <section className="flex flex-col gap-3 w-1/2">
          <LabelForm label="Visi Desa">
            <InputForm
              type="text"
              label="Visi Desa"
              name="visi"
              placeholder="Masukkan visi desa"
            />
          </LabelForm>
          <LabelForm label="Misi Desa">
            <TextareaForm
              label="Misi Desa"
              placeholder="Masukan misi desa"
            ></TextareaForm>
          </LabelForm>
          <LabelForm label="Struktur Aparatur Desa">
            <InputForm
              type="file"
              label="Struktur Aparatur Desa"
              name="struktur"
            />
          </LabelForm>
        </section>
        <section className="flex flex-col gap-3 w-1/2">
          <LabelForm label="Jumlah Penduduk">
            <InputForm
              type="number"
              label="Jumlah Penduduk"
              name="penduduk"
              placeholder="Masukkan jumlah penduduk"
            />
          </LabelForm>
          <LabelForm label="Jumlah Anak-anak">
            <InputForm
              type="number"
              label="Jumlah Anak-anak"
              name="anak_anak"
              placeholder="Masukkan jumlah anak-anak"
            />
          </LabelForm>
          <LabelForm label="Jumlah Dewasa">
            <InputForm
              type="number"
              label="Jumlah Dewasa"
              name="dewasa"
              placeholder="Masukkan jumlah dewasa"
            />
          </LabelForm>
          <LabelForm label="Jumlah Lanjut Usia">
            <InputForm
              type="number"
              label="Jumlah Lanjut Usia"
              name="lanjut_usia"
              placeholder="Masukkan jumlah lanjut usia"
            />
          </LabelForm>
          <div className="flex justify-end mt-3">
            <button
              type="button"
              className="w-max px-3 py-2 bg-primary rounded-md text-white text-sm font-medium gap-2 flex justify-center items-center"
            >
              <IconPlus color="#fff" size={18} />
              <p>Tambah Data</p>
            </button>
          </div>
        </section>
      </form>
    </Card>
  );
}
