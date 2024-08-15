import Button from '@/components/button/Button';
import Card from '@/components/cards/Card';
import { InputForm } from '@/components/forms/InputForm';
import LabelForm from '@/components/forms/LabelForm';
import TextareaForm from '@/components/forms/TextareaForm';

export default function SettingToko() {
  return (
    <Card>
      <form action="" className="flex gap-3" method="post">
        <section className="w-full">
          <LabelForm label="Nama UMKM">
            <InputForm
              label="Nama UMKM"
              name="name"
              type="text"
              placeholder="Masukkan nama UMKM"
            />
          </LabelForm>
          <LabelForm label="Alamat">
            <InputForm
              label="Alamat"
              name="alamat"
              type="text"
              placeholder="Masukkan alamat UMKM"
            />
          </LabelForm>
          <LabelForm label="Nomor Whatsapp">
            <InputForm
              label="Nomor Whatsapp"
              name="no_wa"
              type="text"
              placeholder="Masukkan nomor whatsapp"
            />
          </LabelForm>
        </section>
        <section className="w-full">
          <LabelForm label="Deskripsi UMKM">
            <TextareaForm
              label="Deskripsi UMKM"
              placeholder="Masukkan deskripsi UMKM"
              rows={10}
            ></TextareaForm>
          </LabelForm>
          <div className="flex justify-end mt-5">
            <Button color="primary" size="sm">
              Simpan
            </Button>
          </div>
        </section>
      </form>
    </Card>
  );
}
